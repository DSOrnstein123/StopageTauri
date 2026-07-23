import type { PluginId } from "@system/plugin-manager/plugin";
import NodeContent from "./NodeContent";
import NodeNameLabel from "./NodeNameLabel";
import { useGetNodeDetailQuery } from "../hooks/useGetNodeDetailQuery";
import useMountSidebar from "../hooks/useMountSidebar";
import NodeProvider from "../context/NodeProvider";

const Node = ({ id }: { id: string }) => {
  const { data } = useGetNodeDetailQuery(id);
  useMountSidebar(data?.type as PluginId);

  if (!data) return null;

  const value = {
    id: id,
    icon: data.icon,
  };

  return (
    <NodeProvider props={value}>
      <div className={`relative h-full overflow-auto`}>
        <NodeNameLabel className="fixed top-18.75 left-0" />

        <div className="pt-8">
          <NodeContent data={data} />
        </div>
      </div>
    </NodeProvider>
  );
};

export default Node;
