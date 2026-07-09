import type { EntryType } from "@system/registries/plugin";
import { pluginManager } from "./pluginManager";

export const entryFactory = {
  create(entryType: EntryType) {
    return {
      store: this.createEntryStore(entryType),
      controller: this.createController(entryType),
    };
  },

  createEntryStore(entryType: EntryType) {
    return pluginManager.getEntryConfigs(entryType).createEntryStore?.();
  },

  createController(entryType: EntryType) {
    return pluginManager.getEntryConfigs(entryType).createController?.();
  },
} as const;

export type EntryFactory = typeof entryFactory;
