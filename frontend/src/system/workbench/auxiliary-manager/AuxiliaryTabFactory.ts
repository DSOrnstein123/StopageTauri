import type { EntryType } from "@system/plugin-manager/plugin";
import { pluginManager } from "@system/plugin-manager/pluginManager";
import { AuxiliaryTab } from "../tab/auxiliary-tab/AuxiliaryTab";
import type { WorkbenchHost } from "../core/types/workbenchHost";

export const AuxiliaryTabFactory = {
  create: (workspaceHost: WorkbenchHost, entryType: EntryType) => {
    const segments = pluginManager.getSegments(entryType);

    return new AuxiliaryTab(workspaceHost, entryType, segments);
  },
};
