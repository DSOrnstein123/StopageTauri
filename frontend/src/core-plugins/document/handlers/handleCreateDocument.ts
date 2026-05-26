import createDocument from "../functions/createDocument";
import { systemApi } from "@system/apis";

const handleCreateDocument = async (type: string) => {
  const data = await createDocument();
  systemApi.workspace.openTab({
    id: data.id,
    name: data.name,
    type: type,
    mode: "dynamic",
  });
};

export default handleCreateDocument;
