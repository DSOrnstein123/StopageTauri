import { useNodeContext } from "@system/entry/categories/node/core/context/NodeContext";
import Canvas from "./components/Canvas";
import { useRestore } from "./hooks/useRestore";

export const View = () => {
  const { id } = useNodeContext();
  useRestore(id);

  return <Canvas />;
};
