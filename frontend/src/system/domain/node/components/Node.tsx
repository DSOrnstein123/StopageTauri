import NodeProvider from "../context/NodeProvider";
import NodeContent from "./NodeContent";
import NodeNameLabel from "./NodeNameLabel";

const Node = ({ id }: { id: string }) => {
  const value = {
    id: id,
  };

  return (
    <NodeProvider props={value}>
      <div className="relative h-full">
        <NodeNameLabel className="absolute top-10 left-0" />

        <div className="h-full overflow-auto pt-10">
          <NodeContent />
        </div>
      </div>
    </NodeProvider>
  );
};

export default Node;
