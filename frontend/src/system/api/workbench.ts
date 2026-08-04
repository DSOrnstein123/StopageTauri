import type { EntryType } from "@system/plugin-manager/plugin";
import type { OpenTabParams } from "@system/workbench/tab/types/tabParams";
import { workbenchManager } from "@system/workbench/core/WorkbenchManager";
import type { WorkbenchHost } from "@system/workbench/core/types/workbenchHost";
import type { WorkbenchZone } from "@system/workbench/core/types/workbenchZone";

export const workbenchApi = {
  init: (host: WorkbenchHost) => workbenchManager.init(host),
  openTab: (params: OpenTabParams) => workbenchManager.openTab(params),
  closeTab: (id: string) => workbenchManager.closeTab(id),
  getTab: (id: string) => workbenchManager.getTab(id),
  getTabEntryApi: <E extends EntryType>(id: string) =>
    workbenchManager.getTabEntryApi<E>(id),
  openEntry: (params: OpenTabParams) => workbenchManager.openEntry(params),
  getActiveTabId: (zone: WorkbenchZone) =>
    workbenchManager.getActiveTabIdByZone(zone),
  setActiveTabId: (id: string | null) => workbenchManager.setActiveTabId(id),
};
