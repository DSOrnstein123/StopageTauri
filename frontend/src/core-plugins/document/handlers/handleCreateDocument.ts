import type { NodeType } from "@system/registries/node";
import createDocument from "../functions/createDocument";
import { systemApi } from "@system/api";

const handleCreateDocument = async (type: NodeType) => {
  const data = await createDocument();
  systemApi.workspace.openTab({
    mode: "dynamic",
    type: type,
    nodeId: data.id,
    title: data.name,
  });
};

export default handleCreateDocument;
