import type { NodeType, PluginId } from "@system/registries/plugin";
import type { NodeSlots } from "@system/registries/node";
import { pluginManager } from "@system/registries/pluginManager";

export const pluginApi = {
  getPluginConfigs: () => pluginManager.getPluginConfigs(),
  getApi: <P extends PluginId>(id: P) => pluginManager.getApi(id),
  getActionButtons: () => pluginManager.getActionButtons(),
  getSchema: (type: NodeType) => pluginManager.getNodeSchema(type),
  registerSlot: <N extends NodeType>(
    nodeType: N,
    slots: Partial<NodeSlots<N>>,
  ) => pluginManager.registerNodeSlot(nodeType, slots),
  getNodeSlot: <N extends NodeType, S extends keyof NodeSlots<N> & string>(
    nodeType: N,
    slot: S,
  ): NodeSlots<N>[S] => pluginManager.getNodeSlot(nodeType, slot),
};
