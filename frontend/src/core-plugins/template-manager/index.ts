import type { Plugin } from "@system/registries/plugin";
import TemplateManager from "./components/TemplateManager";
import handleOpenTemplateManager from "./handlers/handleOpenTemplateManager";
import useGetTemplates from "./hooks/useGetTemplates";

export const TemplateManagerPlugin: Plugin = {
  id: "core.template-manager",
  name: "template-manager",

  onRegister: (ctx) => {
    ctx.register(TemplateManagerPlugin.id, {
      component: TemplateManager,
      actionButtons: [
        {
          id: "open-template-manager",
          icon: {
            type: "lucide",
            value: "LayoutTemplate",
          },
          action: () => {
            handleOpenTemplateManager(TemplateManagerPlugin.id);
          },
        },
      ],
      api: {
        hooks: {
          useGetList: useGetTemplates,
        },
      },
    });
  },
};
