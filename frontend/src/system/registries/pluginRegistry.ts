import type {
  Plugin,
  PluginManifest,
  PluginPublicApi,
  Slot,
  NodeConfig,
} from "./plugin";

export class PluginRegistry {
  private plugins = new Map<string, PluginManifest>();
  private nodeTypes = new Map<string, NodeConfig>();

  register(plugin: Plugin) {
    const { id: pluginId, nodes, ...metadata } = plugin;
    if (this.plugins.has(pluginId)) return;

    this.plugins.set(pluginId, metadata);

    if (nodes) {
      Object.entries(nodes).forEach(([nodeType, nodeConfig]) => {
        if (this.nodeTypes.has(nodeType)) {
          throw new Error(`Node type "${nodeType}" already registered`);
        }

        this.nodeTypes.set(nodeType, nodeConfig);
      });
    }
  }

  getNodeComponent(nodeType: string) {
    const nodeConfig = this.nodeTypes.get(nodeType);
    if (!nodeConfig || !nodeConfig.component) {
      throw new Error(
        `[PluginRegistry] Cannot find component for node type '${nodeType}'`,
      );
    }
    return nodeConfig.component;
  }

  getNodeSchema(nodeType: string) {
    const nodeConfig = this.nodeTypes.get(nodeType);
    if (!nodeConfig || !nodeConfig.schema) {
      throw new Error(
        `[PluginRegistry] Cannot find schema for node type '${nodeType}'`,
      );
    }
    return nodeConfig.schema;
  }

  getActionButton(id: string) {
    const plugin = this.plugins.get(id);
    if (!plugin) {
      throw new Error(`[PluginRegistry] Plugin '${id}' is not registered`);
    }
    return plugin.actionButtons;
  }

  getNodeActionButton(nodeType: string) {
    const nodeConfig = this.nodeTypes.get(nodeType);
    if (!nodeConfig) {
      throw new Error(
        `[PluginRegistry] node type '${nodeType}' is not registered`,
      );
    }
    return nodeConfig.actionButtons;
  }

  getActionButtons() {
    return Array.from(this.plugins.values()).flatMap((config) => {
      if (!config.actionButtons) return [];
      return config.actionButtons.map((button) => ({
        ...button,
      }));
    });
  }

  getNodeSlot(nodeType: string, slot: Slot) {
    const nodeConfig = this.nodeTypes.get(nodeType);
    if (!nodeConfig) {
      throw new Error(
        `[PluginRegistry] node type '${nodeType}' is not registered`,
      );
    }
    return nodeConfig.slots?.[slot];
  }

  getApi<K extends keyof PluginPublicApi>(
    id: K,
  ): PluginPublicApi[K] extends { api: infer A } ? A : never {
    const plugin = this.plugins.get(id);
    if (!plugin) {
      throw new Error(`[PluginRegistry] Plugin '${id}' is not registered`);
    }
    return plugin.api as PluginPublicApi[K] extends { api: infer A }
      ? A
      : never;
  }

  getNodeApi<K extends keyof PluginPublicApi>(
    nodeType: K,
  ): PluginPublicApi[K] extends { api: infer A } ? A : never {
    const nodeConfig = this.nodeTypes.get(nodeType);
    if (!nodeConfig) {
      throw new Error(
        `[PluginRegistry] node type '${nodeType}' is not registered`,
      );
    }
    return nodeConfig.api as PluginPublicApi[K] extends { api: infer A }
      ? A
      : never;
  }
}

export const pluginRegistry = new PluginRegistry();
