import type { EntryType } from "@system/plugin-manager/plugin";
import { resolveEntryType } from "../workspace/utils/resolveEntryType";
import type { WorkbenchApi } from "@system/api/workbench";
import { systemApi } from "@system/api";

type AuxiliaryWorkbenchApi = Pick<
  WorkbenchApi,
  "subscribeCurrentEntry" | "openTab"
>;

class AuxiliaryManager {
  private entryType: EntryType | null = null;
  private readonly auxiliaryWorkbenchApi: AuxiliaryWorkbenchApi;

  constructor(auxiliaryWorkbenchApi: AuxiliaryWorkbenchApi) {
    this.auxiliaryWorkbenchApi = auxiliaryWorkbenchApi;
  }

  init() {
    this.auxiliaryWorkbenchApi.subscribeCurrentEntry((currentEntry) => {
      if (!currentEntry) return;

      const entryType = resolveEntryType(currentEntry);

      if (entryType === this.entryType) return;

      //TODO: fix zone field in open tab params (optional or remove field)
      this.auxiliaryWorkbenchApi.openTab({
        kind: "auxiliary",
        entryType: entryType,
        zone: "right-sidebar",
      });
    });
  }
}

export const auxiliaryMangager = new AuxiliaryManager(systemApi.workbench);
auxiliaryMangager.init();
