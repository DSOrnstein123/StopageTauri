import { Tab } from "../tab/tab";
import { type WorkspaceHost } from "./types/workspaceHost";
import { queryClient } from "@system/config/queryClient";
import { getNodeDetailQueryOptions } from "@system/entry/categories/node/core/hooks/useGetNodeDetailQuery";
import type { EntryApi, EntryType } from "@system/plugin-manager/plugin";
import type { StoreApi } from "zustand";
import {
  createWorkspaceStore,
  type WorkspaceStore,
} from "./stores/createWorkspaceStore";
import type { WorkspaceSnapshot } from "./types/workspaceSnapshot";
import type { OpenTabParams } from "../tab/types/tabParams";

class WorkspaceManager {
  private tabs = new Map<string, Tab>();
  private host!: WorkspaceHost;
  private readonly store: StoreApi<WorkspaceStore>;

  constructor() {
    this.store = createWorkspaceStore();
  }

  init() {
    this.restoreState();
    //TODO: optimize save layout by using debounced
    this.host.onLayoutChange((currentLayout) => {
      const snapshot: WorkspaceSnapshot = {
        state: this.captureState(),
        layout: currentLayout,
      };

      localStorage.setItem("workspace-snapshot", JSON.stringify(snapshot));
    });

    this.store.setState({ status: "ready" });
  }

  get activeTabId() {
    return this.store.getState().activeTabId;
  }

  getStore() {
    return this.store;
  }

  setHost(host: WorkspaceHost) {
    this.host = host;
  }

  getActiveTabId() {
    return this.store.getState().activeTabId;
  }

  setActiveTabId(id: string | null) {
    this.store.setState({ activeTabId: id });
  }

  captureState() {
    return {
      tabs: [...this.tabs.values()].map((tab) => tab.captureState()),
      activeTabId: this.activeTabId,
    };
  }

  restoreState() {
    this.tabs.clear();
    this.getStore().setState({ activeTabId: null });

    const rawSnapshot = localStorage.getItem("workspace-snapshot");
    if (rawSnapshot) {
      try {
        const snapshot = JSON.parse(rawSnapshot) as WorkspaceSnapshot;

        this.getStore().setState({ activeTabId: snapshot.state.activeTabId });
        snapshot.state.tabs.forEach((tab) => {
          const tabInstance = Tab.restore(this.host, tab.id, tab.currentEntry);
          this.tabs.set(tab.id, tabInstance);
        });
        this.host.applyLayout(snapshot.layout);
      } catch (error) {
        this.host.loadDefaultLayout();
        console.error("Failed to load snapshot:", error);
      }
    } else {
      this.host.loadDefaultLayout();
    }
  }

  async openEntry(params: OpenTabParams) {
    const activeTabId = this.store.getState().activeTabId;

    if (activeTabId) {
      const activeTab = this.getTab(activeTabId);
      if (params.entryCategory === "node") {
        let nodeType = params.nodeType;
        if (!nodeType) {
          const { type } = await queryClient.ensureQueryData(
            getNodeDetailQueryOptions(params.nodeId),
          );
          nodeType = type;
        }

        activeTab?.navigate({ ...params, nodeType: nodeType });
      } else {
        activeTab?.navigate({ ...params });
      }
    } else {
      this.openTab(params);
    }
  }

  async openTab(params: OpenTabParams) {
    if (!this.host) return;

    const tab = new Tab(this.host);
    this.tabs.set(tab.id, tab);

    this.host?.openTab(tab.id, params);

    if (params.entryCategory === "node") {
      let nodeType = params.nodeType;
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
    this.store.setState({ activeTabId: null });
    this.tabs.delete(id);
    this.host.closeTab(id);
  }

  getTab(id: string) {
    return this.tabs.get(id);
  }

  getTabEntryApi<E extends EntryType>(id: string) {
    return this.tabs.get(id)?.entryApi as EntryApi<E>;
  }
}

export const workspaceManager = new WorkspaceManager();
