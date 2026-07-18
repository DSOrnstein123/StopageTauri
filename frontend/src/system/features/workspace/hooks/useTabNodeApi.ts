import type { NodeApi, NodeType } from "@system/registries/plugin";
import useTab from "./useTab";

const useTabNodeApi = <N extends NodeType>() => {
  const tab = useTab();

  if (tab.currentEntry.entryCategory != "node") {
    throw new Error("Current entry is not a node.");
  }

  return tab.entryApi as NodeApi<N>;
};

export default useTabNodeApi;
