import { useGetNodes } from "@system/entry/categories/node/core/hooks/useGetNodes";
import { useImportNode } from "../hooks/useImportNode";
import { useCurrentNodeId } from "@system/workbench/core/hooks/useCurrentNodeId";

export const NodeList = () => {
  const id = useCurrentNodeId();

  const { data: list = [] } = useGetNodes({
    includeKinds: ["file"],
    includeTypes: ["document"],
  });

  const { mutate: importNode } = useImportNode();

  return (
    <div className="flex flex-col">
      {list.map((item) => (
        <div
          key={item.id}
          className="hover:bg-gray-400"
          onClick={() =>
            importNode({
              canvasId: id,
              nodeId: item.id,
            })
          }
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
