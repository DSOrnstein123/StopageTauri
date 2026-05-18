import NodeProvider from "../context/NodeProvider";
import NodeContent from "./NodeContent";
import NodeNameLabel from "./NodeNameLabel";

const Node = ({ id, className }: { id: string; className: string }) => {
  const value = {
    id: id,
  };

  return (
    <NodeProvider props={value}>
      <div className={`${className} relative overflow-auto`}>
        <NodeNameLabel className="fixed top-18.75 left-0" />

        <div className="pt-8">
          <NodeContent />
        </div>
      </div>
    </NodeProvider>
  );
};

export default Node;
