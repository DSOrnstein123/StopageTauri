import { systemApi } from "@system/apis";

const handleOpenTemplateManager = (type: string) => {
  systemApi.workspace.openTab({
    name: "Template manager",
    type: type,
    mode: "static",
  });
};

export default handleOpenTemplateManager;
