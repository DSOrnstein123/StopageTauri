import { Node, type ReactNodeViewProps } from "@tiptap/react";
import { Component } from "react";

export interface NodeDefinition {
  node: Node;
  component?: Component<ReactNodeViewProps>;
}

export class NodeRegistry {
  private nodes = new Map<string, NodeDefinition>();

  register(
    nodeName: string,
    node: Node,
    component?: Component<ReactNodeViewProps>,
  ) {
    this.nodes.set(nodeName, {
      node: node,
      component: component,
    });
  }

  has(nodeName: string) {
    if (!this.nodes.has(nodeName)) {
      console.error("Node is not defined");
      return false;
    }
    return true;
  }
}
