import type { WorkbenchZone } from "./workbenchZone";
import type { Tab } from "@system/workbench/tab";

export interface TabRecord {
  zone: WorkbenchZone;
  tab: Tab;
}
