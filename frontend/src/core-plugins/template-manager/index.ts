import type { Plugin } from "@system/registries/plugin";
import TemplateManager from "./components/TemplateManager";
import handleOpenTemplateManager from "./handlers/handleOpenTemplateManager";
import useGetTemplates from "./hooks/useGetTemplates";

declare module "@system/registries/pluginRegistry" {
  interface PluginApi {
    "core.template-manager": {
      api: {
        hooks: {
          useGetList: typeof useGetTemplates;
        };
      };
    };
  }
}

export const TemplateManagerPlugin: Plugin = {
  id: "core.template-manager",
  name: "template-manager",
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
  nodes: {
    "core.document-template": {
      component: TemplateManager,
      api: {
        hooks: {
          useGetList: useGetTemplates,
        },
      },
    },
  },
};
