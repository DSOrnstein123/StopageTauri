import { useGetNodes } from "@system/entry/categories/node/core/hooks/useGetNodes";
import { useImportNode } from "../hooks/useImportNode";
import { useAuxiliaryTabContext } from "@system/workbench/tab/auxiliary-tab/context/useAuxiliaryTabContext";

export const DocumentList = () => {
  const { e } = useAuxiliaryTabContext();

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
