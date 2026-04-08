import { NodeViewWrapper } from "@tiptap/react";
import { GripVertical, Trash } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { useMemo } from "react";
import ColumnHeaderWithConfiguration from "./ColumnHeaderWithConfiguration";
import AddColumnButton from "./AddColumnButton";
import type { Collection } from "./collection.types";
import { useQuery } from "@tanstack/react-query";
import collectionKeys from "@/features/document/hooks/collectionKeys";
import { useCollectionNode } from "./context/useCollectionNodeContext";
import { invoke } from "@tauri-apps/api/core";
import AddRowButton from "./AddRowButton";

interface Row {
  id: string;
  properties: Record<string, unknown>;
}

const columnHelper = createColumnHelper<Row>();

const CollectionView = () => {
  const { collectionId } = useCollectionNode();
  const { data: collection = {} as Collection } = useQuery<Collection>({
    queryKey: collectionKeys.detail(collectionId),
    queryFn: () => invoke("get_collection", { id: collectionId }),
    staleTime: Infinity,
  });

  const data: Row[] = useMemo(() => [], []);

  const columns = useMemo(() => {
    const schema = Array.isArray(collection?.schema) ? collection.schema : [];

    return [
      ...schema.map((schema) =>
        columnHelper.accessor((row) => row.properties[schema.id], {
          id: schema.id,
          header: () => <ColumnHeaderWithConfiguration schema={schema} />,
          cell: (data) => data.getValue(),
        }),
      ),

      columnHelper.display({
        id: "_add",
        header: () => <AddColumnButton collectionId={collectionId} />,
        cell: () => (
          <button>
            <Trash />
          </button>
        ),
      }),
    ];
  }, [collection, collectionId]);

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <NodeViewWrapper className="group relative w-full rounded-sm bg-white transition-all">
      <div
        contentEditable={false}
        data-drag-handle
        className="absolute top-2 -left-6 cursor-grab rounded p-0.5 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-yellow-200"
      >
        <GripVertical size={16} className="text-gray-400" />
      </div>

      <div>
        <table className="w-full min-w-200 border-collapse border">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="sticky top-0 z-10 bg-[#f4f4f4] p-2"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="h-32 text-center">
                <td
                  colSpan={table.getAllLeafColumns().length}
                  className="border p-4 text-gray-500 italic"
                />
              </tr>
            )}
          </tbody>
        </table>

        <AddRowButton />
      </div>
    </NodeViewWrapper>
  );
};

export default CollectionView;
