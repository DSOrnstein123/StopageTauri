import createDocument from "../functions/createDocument";
import { systemApi } from "@system/api";

const handleCreateDocument = async () => {
  const data = await createDocument();
  systemApi.workspace.openTab({
    entryCategory: "node",
    title: data.name,
    nodeId: data.id,
    nodeType: "document",
  });
};

export default handleCreateDocument;
