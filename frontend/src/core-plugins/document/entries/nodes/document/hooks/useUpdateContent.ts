import { type JSONContent } from "@system/lib/tiptap";
import { systemApi } from "@system/api";
import { useCallback } from "react";

const useUpdateContent = (id: string) => {
  return useCallback(
    (content: JSONContent) => systemApi.node.updateData(id, content),
    [id],
  );
};

export default useUpdateContent;
