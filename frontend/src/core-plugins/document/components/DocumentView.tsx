import { useEffect } from "react";
import DocumentProvider from "../context/DocumentProvider";
import useDocumentNodeController from "../hooks/useDocumentNodeController";
import DocumentDetail from "./DocumentDetail";
import NodeEditorView from "@system/features/node/components/NodeEditorView";
import { systemApi } from "@system/api";
import { useTabContext } from "@system/features/workspace/context/TabContext";
import useDocumentStore from "../stores/useDocumentStore";

const DocumentView = () => {
  const { tabId } = useTabContext();
  const controller = useDocumentNodeController();
  const documentStore = useDocumentStore();

  useEffect(() => {
    controller.setStore(documentStore);
    systemApi.workspace.registerTabApi<"document">(tabId, {
      controller: controller,
    });
    console.log("register", controller, documentStore);
  }, [tabId, controller, documentStore]);

  return (
    <DocumentProvider value={controller}>
      <NodeEditorView>
        <DocumentDetail />
      </NodeEditorView>
    </DocumentProvider>
  );
};

export default DocumentView;
