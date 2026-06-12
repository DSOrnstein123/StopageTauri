import type { NodeType } from "@system/registries/node";

export type NavigateTarget =
  | {
      mode: "static";
      type: string;
    }
  | {
      mode: "dynamic";
      type?: NodeType;
      nodeId: string;
    };
