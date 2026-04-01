import { NodeViewWrapper } from "@tiptap/react";
import { GripVertical } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useMemo } from "react";

const DatabaseView = () => {
  const data = useMemo(
    () => [
      { id: 1, name: "Nguyễn Văn A", age: 25 },
      { id: 2, name: "Trần Thị B", age: 30 },
    ],
    [],
  );

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Họ và Tên",
        accessorKey: "name",
      },
      {
        header: "Tuổi",
        accessorKey: "age",
      },
    ],
    [],
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
        <table
          className="border"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ padding: "8px", background: "#f4f4f4" }}
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
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={{ padding: "8px" }}>
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

export default DatabaseView;
