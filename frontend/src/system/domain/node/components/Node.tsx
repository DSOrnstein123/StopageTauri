import NodeProvider from "../context/NodeProvider";
import NodeContent from "./NodeContent";
import NodeHeader from "./NodeHeader";
import NodeNameLabel from "./NodeNameLabel";

const Node = ({ id }: { id: string }) => {
  const value = {
    id: id,
  };

  return (
    <NodeProvider props={value}>
      <div className="relative h-full">
        <NodeHeader className="fixed top-0 left-0 h-10 w-full" />
        <NodeNameLabel className="absolute top-10 left-0" />

        <div className="h-full overflow-auto pt-10">
          <NodeContent />
        </div>
      </div>
    </NodeProvider>
  );
};

export default Node;
