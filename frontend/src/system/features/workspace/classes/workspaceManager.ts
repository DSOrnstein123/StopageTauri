import { Tab } from "./tab";
import { type WorkspaceHost } from "../types/workspaceHost";
import { queryClient } from "@system/config/queryClient";
import { getNodeDetailQueryOptions } from "@system/features/node/hooks/useGetNodeDetailQuery";
import type { OpenTabParams } from "../types/tabParams";
import type { EntryApi, EntryType } from "@system/registries/plugin";
import type { StoreApi } from "zustand";
import {
  createWorkspaceStore,
  type WorkspaceStore,
} from "../stores/createWorkspaceStore";

class WorkspaceManager {
  private tabs = new Map<string, Tab>();
  private host!: WorkspaceHost;
  private readonly store: StoreApi<WorkspaceStore>;

  constructor() {
    this.store = createWorkspaceStore();
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
