import useTabEntryApi from "@system/workbench/tab/hooks/useTabEntryApi";
import { useCreateRichTextEditor } from "./useCreateRichTextEditor";
import { useEffect } from "react";

const useRichTextEditor = () => {
  const tabApi = useTabEntryApi();
  const editor = useCreateRichTextEditor();
  //   {
  //   onTOCUpdate: (data) => {
  //     controller.getStore()?.getState().setTOCContent(data);
  //   },
  // }

  useEffect(() => {
    if (!tabApi) return;

    tabApi.setEditor(editor);
  }, [tabApi, editor]);

  return editor;
};

export default useRichTextEditor;
