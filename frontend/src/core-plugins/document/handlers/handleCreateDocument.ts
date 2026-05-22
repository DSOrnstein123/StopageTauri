import { useWorkspaceStore } from "@system/lib/dockview/useWorkspaceStore";
import createDocument from "../functions/createDocument";

const handleCreateDocument = async () => {
  const data = await createDocument();
  useWorkspaceStore
    .getState()
    .openTab({ id: data.id, name: data.name, mode: "dynamic" });
};

export default handleCreateDocument;
