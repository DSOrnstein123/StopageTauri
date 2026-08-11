import { type WorkbenchHost } from "./types/workbenchHost";
import { queryClient } from "@system/config/queryClient";
import { getNodeDetailQueryOptions } from "@system/entry/categories/node/core/hooks/useGetNodeDetailQuery";
import type {
  EntryApi,
  EntryType,
  NodeType,
} from "@system/plugin-manager/plugin";
import {
  createWorkbenchStore,
  type WorkbenchStore,
} from "./store/createWorkbenchStore";
import type {
  WorkbenchSnapshot,
  WorkbenchStateSnapshot,
} from "./types/workbenchSnapshot";
import type {
  OpenAuxiliaryTabParams,
  OpenEntryTabParams,
  OpenTabParams,
} from "../tab/types/tabParams";
import type { TabRecord } from "./types/tabRecord";
import { AuxiliaryTab } from "../tab/auxiliary-tab/AuxiliaryTab";
import type { WorkbenchZone } from "./types/workbenchZone";
import type { HistoryEntry } from "../tab/types/navigation";
import { EntryTab } from "../tab/entry-tab/EntryTab";
import { AuxiliaryTabFactory } from "../auxiliary-manager/AuxiliaryTabFactory";

class WorkbenchManager {
  private tabRecords = new Map<string, TabRecord>();
  private readonly store: WorkbenchStore;
  private host: WorkbenchHost | null = null;

  constructor() {
    this.store = createWorkbenchStore();
  }

  init(host: WorkbenchHost) {
    this.setHost(host);

    if (!this.host) return;

    this.restoreState();
    //TODO: optimize save layout by using debounced later
    this.host.onLayoutChange((currentLayout) => {
      const snapshot: WorkbenchSnapshot = {
        state: this.captureState(),
        layout: currentLayout,
      };

      localStorage.setItem("workbench-snapshot", JSON.stringify(snapshot));
    });

    this.host.onActiveTabChange((zone, tabId) => {
      this.setActiveTabIdByZone(zone, tabId);
      this.syncCurrentEntryFromTab(tabId);
    });

    this.host.onNavigate((tabId) => {
      this.syncCurrentEntryFromTab(tabId);
    });

    this.store.setState({ status: "ready" });
  }

  get currentEntry() {
    return this.store.getState().currentEntry;
  }

  getTabRecord(id: string) {
    const tabRecord = this.tabRecords.get(id);

    if (!tabRecord) {
      throw new Error(`Tab record ${id} does not exist`);
    }

    return tabRecord;
  }

  getTab(id: string) {
    return this.getTabRecord(id).tab;
  }

  getStore() {
    return this.store;
  }

  setHost(host: WorkbenchHost) {
    this.host = host;
  }

  getAllActiveTabIds() {
    return this.store.getState().activeTabIdByZone;
  }

  getActiveTabIdByZone(zone: WorkbenchZone) {
    return this.store.getState().activeTabIdByZone[zone];
  }

  setActiveTabIdByZone(zone: WorkbenchZone, id: string | null) {
    this.store.setState((state) => ({
      activeTabIdByZone: {
        ...state.activeTabIdByZone,
        [zone]: id,
      },
    }));
  }

  setCurrentEntry(entry: HistoryEntry) {
    this.store.setState({
      currentEntry: entry,
    });
  }

  syncCurrentEntryFromTab(tabId: string) {
    const tab = this.getTab(tabId);
    if (tab.kind !== "entry") return;
    this.setCurrentEntry(tab.currentEntry);
  }

  captureState(): WorkbenchStateSnapshot {
    return {
      tabRecords: [...this.tabRecords.values()].map((tabRecord) => ({
        ...tabRecord.tab.captureState(),
        zone: tabRecord.zone,
      })),
      activeTabIdByZone: this.getAllActiveTabIds(),
    };
  }

  restoreState() {
    if (!this.host) return;

    this.tabRecords.clear();
    this.getStore().setState({
      activeTabIdByZone: {
        workspace: null,
        "left-sidebar": null,
        "right-sidebar": null,
      },
    });

    const rawSnapshot = localStorage.getItem("workbench-snapshot");
    if (rawSnapshot) {
      try {
        const snapshot = JSON.parse(rawSnapshot) as WorkbenchSnapshot;

        this.getStore().setState({
          activeTabIdByZone: { ...snapshot.state.activeTabIdByZone },
        });
        snapshot.state.tabRecords.forEach((tabRecord) => {
          const tab = Tab.restore(
            this.host,
            tabRecord.id,
            tabRecord.currentEntry,
          );
          this.tabRecords.set(tabRecord.id, {
            zone: tabRecord.zone,
            tab: tab,
          });
        });
        this.host.applyLayout(snapshot.layout);
      } catch (error) {
        this.host.loadDefaultLayout();
        console.error("Failed to load snapshot:", error);
      }
    } else {
      console.log(this.host);
      this.host.loadDefaultLayout();
    }
  }

  subscribeCurrentEntry(listener: (entry: HistoryEntry | null) => void) {
    return this.store.subscribe((state) => state.currentEntry, listener);
  }

  async openEntry(params: OpenEntryTabParams) {
    const activeTabId = this.store.getState().activeTabIdByZone.workspace;

    if (!activeTabId) {
      this.openTab({
        ...params,
        kind: "entry",
      });
      return;
    }

    const activeTab = this.getTab(activeTabId);

    if (activeTab instanceof AuxiliaryTab) {
      this.openTab({
        ...params,
        kind: "entry",
      });
      return;
    }

    if (params.entryCategory === "node") {
      let nodeType: NodeType | undefined = params.nodeType;
      if (!nodeType) {
        const { type } = await queryClient.ensureQueryData(
          getNodeDetailQueryOptions(params.nodeId),
        );
        nodeType = type;
      }

      activeTab.navigate({ ...params, nodeType: nodeType });
    } else {
      activeTab.navigate({ ...params });
    }
  }

  async openTab(params: OpenTabParams) {
    if (!this.host) return;

    switch (params.kind) {
      case "auxiliary":
        this.openAuxiliaryTab(params);
        break;
      case "entry":
        this.openEntryTab(params);
        break;
    }
  }

  private openAuxiliaryTab(params: OpenAuxiliaryTabParams) {
    if (!this.host) return;

    const tab = AuxiliaryTabFactory.create(this.host, params.entryType);
    const tabRecord: TabRecord = {
      zone: "right-sidebar",
      tab: tab,
    };
    this.tabRecords.set(tabRecord.tab.id, tabRecord);

    this.host.openTab(tabRecord, {
      ...params,
      kind: "auxiliary",
    });
  }

  private async openEntryTab(params: OpenEntryTabParams) {
    if (!this.host) return;

    const tab = new EntryTab(this.host);
    const tabRecord: TabRecord = {
      zone: params.zone,
      tab: tab,
    };
    this.tabRecords.set(tabRecord.tab.id, tabRecord);

    this.host.openTab(tabRecord, {
      ...params,
      kind: "entry",
    });

    if (params.entryCategory === "node") {
      let nodeType: NodeType | undefined = params.nodeType;
      if (!nodeType) {
        const { type } = await queryClient.ensureQueryData(
          getNodeDetailQueryOptions(params.nodeId),
        );
        nodeType = type;
      }

      tab.navigate({ ...params, nodeType: nodeType });
    } else {
      tab.navigate({ ...params });
    }
  }

  closeTab(id: string) {
    if (!this.host) return;

    const tabRecord = this.getTabRecord(id);
    this.tabRecords.delete(id);
    this.host.closeTab(tabRecord.zone, id);
  }

  getTabEntryApi<E extends EntryType>(id: string) {
    return this.getTab(id).entryApi as EntryApi<E>;
  }
}

export const workbenchManager = new WorkbenchManager();
