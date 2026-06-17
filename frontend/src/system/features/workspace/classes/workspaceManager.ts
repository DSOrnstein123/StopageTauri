import type { NodeType } from "@system/registries/node";
import type { TabApi, TabApiMap } from "../types/tab";

class WorkspaceManager {
  private apisMap = new Map<string, TabApi>();

  register<N extends NodeType>(tabId: string, api: TabApiMap<N>) {
    this.apisMap.set(tabId, api);
  }

  getApi<N extends NodeType>(tabId: string): TabApiMap<N> {
    return this.apisMap.get(tabId) as TabApiMap<N>;
  }
}

export const workspaceManager = new WorkspaceManager();
