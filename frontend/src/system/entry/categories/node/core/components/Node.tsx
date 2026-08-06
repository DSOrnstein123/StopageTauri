import NodeContent from "./NodeContent";
import NodeNameLabel from "./NodeNameLabel";
import { useGetNodeDetailQuery } from "../hooks/useGetNodeDetailQuery";
import NodeProvider from "../context/NodeProvider";

const Node = ({ id }: { id: string }) => {
  const { data } = useGetNodeDetailQuery(id);

  if (!data) return null;

  const value = {
    id: id,
  };

  return (
    <NodeProvider props={value}>
      <div className={`relative h-full overflow-auto`}>
        <NodeNameLabel className="fixed top-18.75 left-0" />

        <div className="h-full w-full">
          <NodeContent data={data} />
        </div>
      </div>
    </NodeProvider>
  );
};

export default Node;
