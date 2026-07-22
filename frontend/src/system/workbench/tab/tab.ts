import { createTabStore, type TabStore } from "./store";
import type { HistoryEntry } from "./types/navigation";
import type { WorkspaceHost } from "../workspace/types/workspaceHost";
import type { EntryType } from "@system/plugin-manager/plugin";
import { resolveEntryType } from "../workspace/utils/resolveEntryType";
import { EntryRuntime } from "@system/entry/core/entryRuntime";
import { entryFactory } from "@system/entry/core/entryFactory";

export class Tab {
  readonly id: string;
  private readonly workspaceHost: WorkspaceHost;
  private readonly tabStore: TabStore;
  private entryFactory = entryFactory;
  private entryRuntime?: EntryRuntime;

  constructor(workspaceHost: WorkspaceHost, id?: string) {
    this.id = id ?? crypto.randomUUID();
    this.tabStore = createTabStore();
    this.workspaceHost = workspaceHost;
  }

  get currentEntry() {
    const { history, currentIndex } = this.tabStore.getState();
    return history[currentIndex];
  }

  get entryStore() {
    return this.entryRuntime?.store;
  }

  get entryApi() {
    return this.entryRuntime?.api;
  }

  static restore(host: WorkspaceHost, id: string, currentEntry: HistoryEntry) {
    const tab = new Tab(host, id);
    tab.navigate(currentEntry);
    return tab;
  }

  captureState() {
    return {
      id: this.id,
      currentEntry: this.currentEntry,
    };
  }

  setTitle(newTitle: string) {
    this.workspaceHost.setTitle(this.id, newTitle);
  }

  load(entryType: EntryType) {
    this.entryRuntime?.destroy();

    const { store, controller } = this.entryFactory.create(entryType);
    this.entryRuntime = new EntryRuntime(store, controller);
  }

  navigate(entry: HistoryEntry) {
    this.tabStore.setState((state) => {
      const history = state.history.slice(0, state.currentIndex + 1);
      history.push(entry);

      return {
        history,
        currentIndex: history.length - 1,
      };
    });

    const entryType = resolveEntryType(entry);
    this.load(entryType);

    this.workspaceHost.navigate(this.id, entry);
  }

  forward() {
    this.tabStore.setState((state) => {
      if (state.currentIndex + 1 > state.history.length - 1) return state;

      return {
        currentIndex: state.currentIndex + 1,
      };
    });

    const entryType = resolveEntryType(this.currentEntry);
    this.load(entryType);

    this.workspaceHost.navigate(this.id, this.currentEntry);
  }

  back() {
    this.tabStore.setState((state) => {
      if (state.currentIndex === 0) return state;

      return {
        currentIndex: state.currentIndex - 1,
      };
    });

    const entryType = resolveEntryType(this.currentEntry);
    this.load(entryType);

    this.workspaceHost.navigate(this.id, this.currentEntry);
  }
}
