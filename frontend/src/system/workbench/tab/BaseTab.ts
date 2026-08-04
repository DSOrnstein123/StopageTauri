import { type TabStore } from "./types/store";
import type { WorkbenchHost } from "../core/types/workbenchHost";
import type { TabKind } from "./types/kind";

export abstract class BaseTab {
  readonly id: string;
  abstract readonly kind: TabKind;
  abstract readonly store: TabStore;
  protected readonly workbenchHost: WorkbenchHost;

  constructor(workbenchHost: WorkbenchHost, id?: string) {
    this.id = id ?? crypto.randomUUID();
    this.workbenchHost = workbenchHost;
  }

  abstract restore(host: WorkbenchHost, id: string): BaseTab;

  abstract captureState(): void;

  setTitle(newTitle: string) {
    this.workbenchHost.setTitle(this.id, newTitle);
  }
}
