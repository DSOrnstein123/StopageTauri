import { NodeStoreController } from "@system/entry/categories/node/core/controller";
import type { Store } from "./store";
import { nodeService } from "@system/entry/categories/node/core/service";
import { serializeEdges, serializeNodes } from "./serialize";
import type { NodeControllerContext } from "@system/entry/categories/node/core/types/controllerContext";
import { deserializeEdges, deserializeNodes } from "./deserialize";
import type { Node } from "@xyflow/react";

class Controller extends NodeStoreController<Store> {
  readonly api = {
    save: this.save.bind(this),
    restore: this.restore.bind(this),
    addNode: (node: Node) => this.store?.getState().addNode(node),
  };

  async save() {
    if (!this.store) return;

    const nodes = this.store.getState().nodes;
    const edges = this.store.getState().edges;

    await nodeService.patchData(this.nodeId, {
      nodes: serializeNodes(nodes),
      edges: serializeEdges(edges),
    });
  }

  async restore() {
    if (!this.store) return;

    const node = await nodeService.getDetail(this.nodeId);

    const deserializedNodes = deserializeNodes(node.data.nodes ?? []);
    const deserializedEdges = deserializeEdges(node.data.edges ?? []);

    this.store.setState({
      nodes: deserializedNodes,
      edges: deserializedEdges,
    });

    const deserializedNode = {
      ...node,
      data: {
        nodes: deserializedNodes,
        edges: deserializedEdges,
      },
    };

    return deserializedNode;
  }
}

export const createController = (context: NodeControllerContext) =>
  new Controller(context.nodeId);
