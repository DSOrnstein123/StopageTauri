import NodeProvider from "../context/NodeProvider";
import { useGetNodeDetail } from "../hooks/useGetNodeDetail";
import NodeContent from "./NodeContent";
import NodeNameLabel from "./NodeNameLabel";

const Node = ({ id, className }: { id: string; className: string }) => {
  const { data } = useGetNodeDetail(id);
  if (!data) return null;

  const value = {
    id: id,
    icon: data.icon,
  };

  return (
    <NodeProvider props={value}>
      <div className={`${className} relative overflow-auto`}>
        <NodeNameLabel className="fixed top-18.75 left-0" />

        <div className="pt-8">
          <NodeContent data={data} />
        </div>
      </div>
    </NodeProvider>
  );
};

export default Node;
