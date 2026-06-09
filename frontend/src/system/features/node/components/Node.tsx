import type { PluginId } from "@system/registries/plugin";
import NodeProvider from "../context/NodeProvider";
import { useGetNodeQuery } from "../hooks/useGetNodeQuery";
import useMountSidebar from "../hooks/useMountSidebar";
import NodeContent from "./NodeContent";
import NodeNameLabel from "./NodeNameLabel";

const Node = ({ id }: { id: string }) => {
  const { data } = useGetNodeQuery(id);
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
