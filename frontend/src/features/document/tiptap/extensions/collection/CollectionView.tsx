import { NodeViewWrapper } from "@tiptap/react";
import { GripVertical, Trash } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { useMemo } from "react";

import type { ColumnSchema } from "./collection.types";
import ColumnHeaderWithConfiguration from "./ColumnHeaderWithConfiguration";
import AddColumnButton from "./AddColumnButton";

interface Row {
  id: string;
  properties: Record<string, unknown>;
}

const columnHelper = createColumnHelper<Row>();

const CollectionView = ({ columnSchema }: { columnSchema: ColumnSchema[] }) => {
  const data: Row[] = useMemo(
    () => [
      { id: "1", properties: { c1: "Nguyễn Văn A" } },
      { id: "2", properties: { c1: "Nguyễn Văn B" } },
    ],
    [],
  );

  const columns = useMemo(
    () => [
      ...columnSchema.map((schema) =>
        columnHelper.accessor((row) => row.properties[schema.id], {
          id: schema.id,
          header: () => <ColumnHeaderWithConfiguration schema={schema} />,
          cell: (data) => data.getValue(),
        }),
      ),

      columnHelper.display({
        id: "_add",
        header: () => <AddColumnButton collectionId={} />,
        cell: () => (
          <button>
            <Trash />
          </button>
        ),
      }),
    ],
    [columnSchema],
  );

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <NodeViewWrapper className="group relative w-full rounded-sm border bg-white p-4 transition-all">
      <div
        contentEditable={false}
        data-drag-handle
        className="absolute top-2 -left-6 cursor-grab rounded p-0.5 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-yellow-200"
      >
        <GripVertical size={16} className="text-gray-400" />
      </div>

      <div className="p-4">
        <table className="w-full border-collapse border">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="bg-[#f4f4f4] p-2">
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
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </NodeViewWrapper>
  );
};

export default CollectionView;
