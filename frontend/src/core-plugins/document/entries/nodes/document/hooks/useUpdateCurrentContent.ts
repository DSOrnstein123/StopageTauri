import { type JSONContent } from "@system/lib/tiptap";
import { systemApi } from "@system/api";
import { useCallback } from "react";
import useCurrentNodeId from "@system/workbench/tab/hooks/useCurrentNodeId";

//TODO: validate id
const useUpdateCurrentContent = () => {
  const id = useCurrentNodeId();
  return useCallback(
    (content: JSONContent) => {
      if (!id) return;
      return systemApi.node.updateData(id, content);
    },
    [id],
  );
};

export default useUpdateCurrentContent;
