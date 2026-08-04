import { systemApi } from "@system/api";
import { TOOLS } from "../../../../constants";

const handleOpenTemplateManager = () => {
  systemApi.workbench.openTab({
    entryCategory: "tool",
    title: "Template manager",
    toolType: TOOLS.TEMPLATE_MANAGER,
  });
};

export default handleOpenTemplateManager;
