import type { PropertyType } from "./collection.types";
import { useEffect, useMemo, useState } from "react";
import debounce from "@system/utils/debounce";
import { invoke } from "@tauri-apps/api/core";

interface CellProps {
  data: unknown;
  documentId: string;
  propertyId: string;
  propertyType: PropertyType;
}

const Cell = ({ data, documentId, propertyId, propertyType }: CellProps) => {
  const [localValue, setLocalValue] = useState(data?.toString() || "");

  useEffect(() => {
    setLocalValue(data?.toString() || "");
  }, [data]);

  const debouncedInvoke = useMemo(
    () =>
      debounce((newValue: string) => {
        invoke("update_document_property", {
          documentId: documentId,
          propertyId: propertyId,
          newValue: newValue,
        });
      }, 500),
    [documentId, propertyId],
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLocalValue(value);
    debouncedInvoke(value);
  };

  return (
    <div className="flex h-full min-h-8 w-full items-center px-2">
      {propertyType === "text" && (
        <input
          className="w-full rounded border-none bg-transparent outline-none focus:ring-1 focus:ring-blue-500"
          value={localValue}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default Cell;
