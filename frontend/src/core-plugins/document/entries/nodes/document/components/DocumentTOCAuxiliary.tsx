import { systemApi } from "@system/api";
import useActiveTabId from "@system/features/workspace/hooks/useActiveTabId";
import DocumentTOCAuxiliaryContent from "./DocumentTOCAuxiliaryContent";

const DocumentTOCAuxiliary = () => {
  const activeTabId = useActiveTabId();

  const tabApi = systemApi.workspace.getTabApi<"document">(activeTabId!);
  const editor = tabApi?.controller?.getEditor() ?? null;
  const store = tabApi?.controller?.getStore() ?? null;

  return (
    <div>
      <div>Table of contents</div>
      {tabApi && editor && store && (
        <DocumentTOCAuxiliaryContent editor={editor} store={store} />
      )}
    </div>
  );
};

export default DocumentTOCAuxiliary;
