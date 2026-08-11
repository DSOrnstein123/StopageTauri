import type { WorkbenchHost } from "@system/workbench/core/types/workbenchHost";
import { BaseTab } from "../BaseTab";
import { entryFactory } from "@system/entry/core/entryFactory";
import { EntryRuntime } from "@system/entry/core/entryRuntime";
import { createStore, type EntryTabStore } from "./store";
import type {
  EntryCategory,
  EntryStoreMap,
  EntryType,
  NodeType,
  ToolType,
} from "@system/plugin-manager/plugin";
import type { HistoryEntry, HistoryNodeEntry } from "../types/navigation";
import { resolveEntryType } from "@system/workbench/workspace/utils/resolveEntryType";

export class EntryTab extends BaseTab {
  readonly kind = "entry";
  readonly store: EntryTabStore;
  private entryFactory = entryFactory;
  private entryRuntime?: EntryRuntime;

  constructor(workbenchHost: WorkbenchHost, id?: string) {
    super(workbenchHost, id);
    this.store = createStore();
  }

  get currentEntry() {
    const { history, currentIndex } = this.store.getState();
    return history[currentIndex];
  }

  get entryType() {
    const currentEntry = this.currentEntry;

    if (!currentEntry) {
      return undefined;
    }

    return currentEntry.entryCategory === "node"
      ? currentEntry.nodeType
      : currentEntry.toolType;
  }

  get entryStore() {
    return this.entryRuntime?.store;
  }

  get entryApi() {
    return this.entryRuntime?.api;
  }

  static restore(host: WorkbenchHost, id: string, currentEntry: HistoryEntry) {
    const tab = new Tab(host, id);
    tab.navigate(currentEntry);
    return tab;
  }

  getEntryStore<E extends EntryType>(expectedType: E) {
    if (!this.entryType || this.entryType !== expectedType) {
      return undefined;
    }

    return this.entryStore as EntryStoreMap<E>;
  }

  override captureState() {
    return {
      id: this.id,
      currentEntry: this.currentEntry,
    };
  }

  load(entryCategory: EntryCategory, entryType: EntryType) {
    this.entryRuntime?.destroy();

    const { store, controller } =
      entryCategory === "node"
        ? this.entryFactory.create({
            category: "node",
            type: entryType as NodeType,
            context: {
              nodeId: (this.currentEntry as HistoryNodeEntry).nodeId,
            },
          })
        : this.entryFactory.create({
            category: "tool",
            type: entryType as ToolType,
            context: {},
          });
    this.entryRuntime = new EntryRuntime(store, controller);

    this.store.getState().setEntryStatus("ready");
  }

  navigate(entry: HistoryEntry) {
    this.store.setState((state) => {
      const history = state.history.slice(0, state.currentIndex + 1);
      history.push(entry);

      return {
        history,
        currentIndex: history.length - 1,
      };
    });

    const entryType = resolveEntryType(entry);
    this.load(entry.entryCategory, entryType);

    this.workbenchHost.navigate(this.id, entry);
  }

  forward() {
    this.store.setState((state) => {
      if (state.currentIndex + 1 > state.history.length - 1) return state;

      return {
        currentIndex: state.currentIndex + 1,
      };
    });

    const entryType = resolveEntryType(this.currentEntry);
    this.load(this.currentEntry.entryCategory, entryType);

    this.workbenchHost.navigate(this.id, this.currentEntry);
  }

  back() {
    this.store.setState((state) => {
      if (state.currentIndex === 0) return state;

      return {
        currentIndex: state.currentIndex - 1,
      };
    });

    const entryType = resolveEntryType(this.currentEntry);
    this.load(this.currentEntry.entryCategory, entryType);

    this.workbenchHost.navigate(this.id, this.currentEntry);
  }
}
