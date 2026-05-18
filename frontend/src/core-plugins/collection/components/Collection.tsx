import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { useMemo } from "react";
import ColumnHeaderWithConfiguration from "./ColumnHeaderWithConfiguration";
import AddColumnButton from "./AddColumnButton";
import type { Collection as CollectionType } from "./collection.types";
import { useQuery } from "@tanstack/react-query";
import collectionKeys from "@core-plugins/collection/keys/collectionKeys";
import AddDocumentButton from "./AddDocumentButton";
import Cell from "./Cell";
import { collectionService } from "../services/collectionService";
import { useCollectionNode } from "../context/useCollectionNodeContext";
import { Trash } from "lucide-react";
import type { DocumentFile } from "@core-plugins/document/schemas/documentSchema";

const columnHelper = createColumnHelper<DocumentFile>();

const Collection = () => {
  const { collectionId } = useCollectionNode();
  const { data: collection = {} as CollectionType } = useQuery<CollectionType>({
    queryKey: collectionKeys.detail(collectionId),
    queryFn: () => collectionService.get(collectionId),
    staleTime: Infinity,
  });

  const { data = [] } = useQuery<DocumentFile[]>({
    queryKey: collectionKeys.documentList(collectionId),
    queryFn: () => collectionService.getDocuments(collectionId),
    staleTime: Infinity,
  });

  const columns = useMemo(() => {
    const schema = Array.isArray(collection?.schema) ? collection.schema : [];

    return [
      ...schema.map((schema) =>
        columnHelper.accessor((row) => row.property?.[schema.id], {
          id: schema.id,
          header: () => <ColumnHeaderWithConfiguration schema={schema} />,
          cell: (data) => (
            <Cell
              data={data.getValue()!}
              documentId={data.row.original.id}
              propertyId={schema.id}
              propertyType={schema.type}
            />
          ),
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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

      <AddDocumentButton />
    </div>
  );
};

export default Collection;
