import type { EntryApi, EntryType } from "@system/plugin-manager/plugin";
import type {
  OpenEntryTabParams,
  OpenTabParams,
} from "@system/workbench/tab/types/tabParams";
import type { Tab } from "@system/workbench/tab";
import { workbenchManager } from "@system/workbench/core/WorkbenchManager";
import type { WorkbenchHost } from "@system/workbench/core/types/workbenchHost";
import type { WorkbenchZone } from "@system/workbench/core/types/workbenchZone";
import type { HistoryEntry } from "@system/workbench/tab/types/navigation";

export interface WorkbenchApi {
  init: (host: WorkbenchHost) => void;
  openTab: (params: OpenTabParams) => Promise<void>;
  closeTab: (id: string) => void;
  getTab: (id: string) => Tab;
  getTabEntryApi: <E extends EntryType>(id: string) => EntryApi<E>;
  openEntry: (params: OpenEntryTabParams) => Promise<void>;
  getActiveTabId: (zone: WorkbenchZone) => string | null;
  subscribeCurrentEntry: (
    listener: (entry: HistoryEntry | null) => void,
  ) => () => void;
  setActiveTabId: (id: string | null) => void;
}

export const workbenchApi: WorkbenchApi = {
  init: (host: WorkbenchHost) => workbenchManager.init(host),
  openTab: (params: OpenTabParams) => workbenchManager.openTab(params),
  closeTab: (id: string) => workbenchManager.closeTab(id),
  getTab: (id: string) => workbenchManager.getTab(id),
  getTabEntryApi: <E extends EntryType>(id: string) =>
    workbenchManager.getTabEntryApi<E>(id),
  openEntry: (params: OpenEntryTabParams) => workbenchManager.openEntry(params),
  getActiveTabId: (zone: WorkbenchZone) =>
    workbenchManager.getActiveTabIdByZone(zone),
  subscribeCurrentEntry: (listener: (entry: HistoryEntry | null) => void) =>
    workbenchManager.subscribeCurrentEntry(listener),
  setActiveTabId: (id: string | null) => workbenchManager.setActiveTabId(id),
};
