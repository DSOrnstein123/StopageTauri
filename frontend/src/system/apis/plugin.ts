import type { NodeType, PluginId } from "@system/registries/plugin";
import { pluginRegistry } from "@system/registries/pluginRegistry";

export const pluginApi = {
  getAllPlugins: () => pluginRegistry.getPlugins(),
  getApi: <P extends PluginId>(id: P) => pluginRegistry.getApi(id),
  getSchema: (type: NodeType) => pluginRegistry.getNodeSchema(type),
};
