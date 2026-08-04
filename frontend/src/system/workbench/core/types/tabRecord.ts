import type { AuxiliaryTab } from "@system/workbench/tab/auxiliary-tab/AuxiliaryTab";
import type { WorkbenchZone } from "./workbenchZone";
import type { Tab } from "@system/workbench/tab/tab";

export interface TabRecord {
  zone: WorkbenchZone;
  tab: Tab | AuxiliaryTab;
}
