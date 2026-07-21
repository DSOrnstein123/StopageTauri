import type { NodeType, PluginId } from "@system/plugin-manager/plugin";
import type { NodeSlots } from "@system/plugin-manager/node";
import { pluginManager } from "@system/plugin-manager/pluginManager";

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
  getNodeNamePlaceholder: (nodeType: NodeType) =>
    pluginManager.getNodeNamePlaceholder(nodeType),
};
