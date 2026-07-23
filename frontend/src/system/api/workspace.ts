import { type WorkspaceHost } from "@system/workbench/workspace/types/workspaceHost";
import { workspaceManager } from "@system/workbench/workspace/workspaceManager";
import type { EntryType } from "@system/plugin-manager/plugin";
import type { OpenTabParams } from "@system/workbench/tab/types/tabParams";

export const workspaceApi = {
  init: () => workspaceManager.init(),
  openTab: (params: OpenTabParams) => workspaceManager.openTab(params),
  closeTab: (id: string) => workspaceManager.closeTab(id),
  getTab: (id: string) => workspaceManager.getTab(id),
  getTabEntryApi: <E extends EntryType>(id: string) =>
    workspaceManager.getTabEntryApi<E>(id),
  setHost: (host: WorkspaceHost) => workspaceManager.setHost(host),
  openEntry: (params: OpenTabParams) => workspaceManager.openEntry(params),
  getActiveTabId: () => workspaceManager.getActiveTabId(),
  setActiveTabId: (id: string | null) => workspaceManager.setActiveTabId(id),
};
