import TemplateManager from "./components/TemplateManager";
import handleOpenTemplateManager from "./handlers/handleOpenTemplateManager";
import type { ToolConfig } from "@system/plugin-manager/tool";

export const templateManagerConfig = {
  view: TemplateManager,
  actionButtons: [
    {
      id: "open-template-manager",
      icon: {
        type: "lucide",
        value: "LayoutTemplate",
      },
      action: () => {
        handleOpenTemplateManager();
      },
    },
  ],
} satisfies ToolConfig;
