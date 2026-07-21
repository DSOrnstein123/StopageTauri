import { systemApi } from "@system/api";
import type { NodeSlots } from "@system/plugin-manager/node";
import type { NodeType } from "@system/plugin-manager/plugin";
import type { ComponentType } from "react";

const NodeSlot = <N extends NodeType, S extends keyof NodeSlots<N> & string>({
  nodeType,
  slot,
}: {
  nodeType: N;
  slot: S;
}) => {
  const SlotComponent = systemApi.plugin.getNodeSlot(nodeType, slot) as
    | ComponentType<{ data?: unknown }>
    | undefined;
  if (!SlotComponent) return null;

  return <SlotComponent />;
};

export default NodeSlot;
