import type { NodeSlots, NodeType, PluginId } from "@system/registries/plugin";
import { pluginRegistry } from "@system/registries/pluginRegistry";

export const pluginApi = {
  getAllPlugins: () => pluginRegistry.getPlugins(),
  getApi: <P extends PluginId>(id: P) => pluginRegistry.getApi(id),
  getSchema: (type: NodeType) => pluginRegistry.getNodeSchema(type),
  registerSlot: <N extends NodeType>(nodeType: N, slots: NodeSlots<N>) =>
    pluginRegistry.registerNodeSlot(nodeType, slots),
  getNodeSlot: <N extends NodeType, S extends keyof NodeSlots<N> & string>(
    nodeType: N,
    slot: S,
  ): NodeSlots<N>[S] => pluginRegistry.getNodeSlot(nodeType, slot),
};
