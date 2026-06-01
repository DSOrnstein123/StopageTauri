import { systemApi } from "@system/apis";

const handleOpenTemplateManager = (type: string) => {
  systemApi.workspace.openTab({
    title: "Template manager",
    type: type,
    mode: "static",
  });
};

export default handleOpenTemplateManager;
