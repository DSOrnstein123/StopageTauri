import Node from "@system/entry/categories/node/core/components/Node";
import useCurrentEntry from "../hooks/useCurrentEntry";
import ToolTab from "../components/ToolTab";

export const View = () => {
  const currentEntry = useCurrentEntry();

  return (
    <div className="h-full w-full">
      {currentEntry.entryCategory == "node" ? (
        <Node id={currentEntry.nodeId} />
      ) : (
        <ToolTab toolType={currentEntry.toolType} />
      )}
    </div>
  );
};
