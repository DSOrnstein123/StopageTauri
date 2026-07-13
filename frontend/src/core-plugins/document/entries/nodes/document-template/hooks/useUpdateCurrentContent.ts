import { type JSONContent } from "@system/lib/tiptap";
import { systemApi } from "@system/api";
import { useCallback } from "react";
import useCurrentNodeId from "@system/features/workspace/hooks/useCurrentNodeId";

//TODO: validate id
const useUpdateCurrentContent = () => {
  const id = useCurrentNodeId();
  return useCallback(
    (content: JSONContent) => {
      if (!id) return;
      return systemApi.node.updateData<"document-template">(id, {
        defaultContent: content,
      });
    },
    [id],
  );
};

export default useUpdateCurrentContent;
