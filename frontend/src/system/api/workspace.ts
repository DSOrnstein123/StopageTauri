import { type WorkspaceHost } from "@system/features/workspace/types/workspaceHost";
import type { OpenTabParams } from "@system/features/workspace/types/tabParams";
import { workspaceManager } from "@system/features/workspace/classes/workspaceManager";
import type { EntryType } from "@system/registries/plugin";

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
