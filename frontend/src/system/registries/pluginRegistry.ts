import type { NodeConfig, NodeSlots, NodeType } from "./node";
import type {
  Plugin,
  PluginId,
  PluginRegistryMap,
  PluginConfig,
} from "./plugin";

type ExtractPluginApi<P extends PluginId> = PluginRegistryMap[P] extends {
  api: infer A;
}
  ? A
  : never;

export class PluginRegistry {
  private plugins = new Map<string, PluginConfig>();
  private nodeTypes = new Map<string, NodeConfig>();

  register(plugin: Plugin) {
    const { id: pluginId, nodes, ...metadata } = plugin;
    if (this.plugins.has(pluginId)) return;

    this.plugins.set(pluginId, { ...metadata, nodes: nodes });

    if (nodes) {
      Object.entries(nodes).forEach(([nodeType, nodeConfig]) => {
        if (this.nodeTypes.has(nodeType)) {
          throw new Error(`Node type "${nodeType}" already registered`);
        }

        this.nodeTypes.set(nodeType, nodeConfig);
      });
    }
  }

  registerNodeSlot<N extends NodeType>(nodeType: N, slots: NodeSlots<N>) {
    const nodeConfig = this.nodeTypes.get(nodeType);
    if (!nodeConfig) {
      throw new Error(
        `[PluginRegistry] node type '${nodeType}' is not registered`,
      );
    }

    nodeConfig.slots = {
      ...nodeConfig.slots,
      ...slots,
    };
  }

  hasNode(value: string) {
    return this.nodeTypes.has(value);
  }

  getPlugins() {
    return this.plugins;
  }

  getComponent(pluginId: PluginId) {
    const nodeConfig = this.plugins.get(pluginId);
    if (!nodeConfig || !nodeConfig.component) {
      throw new Error(
        `[PluginRegistry] Cannot find component for plugin '${pluginId}'`,
      );
    }
    return nodeConfig.component;
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

  getActionButton(pluginId: string) {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new Error(
        `[PluginRegistry] Plugin '${pluginId}' is not registered`,
      );
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
      const pluginActionButtons = config.actionButtons ?? [];
      const nodeActionButtons = config.nodes
        ? Object.values(config.nodes).flatMap(
            (config) => config.actionButtons ?? [],
          )
        : [];
      return [...pluginActionButtons, ...nodeActionButtons];
    });
  }

  getNodeSlot<N extends NodeType, S extends keyof NodeSlots<N> & string>(
    nodeType: N,
    slot: S,
  ): NodeSlots<N>[S] {
    const nodeConfig = this.nodeTypes.get(nodeType);
    if (!nodeConfig) {
      throw new Error(
        `[PluginRegistry] node type '${nodeType}' is not registered`,
      );
    }
    return nodeConfig.slots?.[slot] as NodeSlots<N>[S];
  }

  getApi<P extends PluginId>(pluginId: P): ExtractPluginApi<P> {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new Error(
        `[PluginRegistry] Plugin '${pluginId}' is not registered`,
      );
    }
    return plugin.api as ExtractPluginApi<P>;
  }

  getNodeApi<N extends PluginId>(
    nodeType: N,
  ): PluginRegistryMap[N] extends { api: infer A } ? A : never {
    const nodeConfig = this.nodeTypes.get(nodeType);
    if (!nodeConfig) {
      throw new Error(
        `[PluginRegistry] node type '${nodeType}' is not registered`,
      );
    }
    return nodeConfig.api as PluginRegistryMap[N] extends { api: infer A }
      ? A
      : never;
  }
}

export const pluginRegistry = new PluginRegistry();
