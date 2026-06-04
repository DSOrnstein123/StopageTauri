import type { PluginId } from "@system/registries/plugin";
import { pluginRegistry } from "@system/registries/pluginRegistry";

export const pluginApi = {
  getApi: <P extends PluginId>(id: P) => {
    return pluginRegistry.getApi(id);
  },
};
