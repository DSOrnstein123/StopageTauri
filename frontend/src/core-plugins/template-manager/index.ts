import type { Plugin } from "@system/registries/plugin";
import TemplateManager from "./components/TemplateManager";
import handleOpenTemplateManager from "./handlers/handleOpenTemplateManager";
import useGetTemplates from "./hooks/useGetTemplates";
import { PLUGIN_ID } from "./constants";

declare module "@system/registries/plugin" {
  interface PluginRegistryMap {
    "core.template-manager": {
      api: {
        hooks: {
          useGetList: typeof useGetTemplates;
        };
      };
      nodes: {
        "document-template": {};
      };
    };
  }
}

export const TemplateManagerPlugin: Plugin = {
  id: PLUGIN_ID,
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
    "document-template": {
      component: TemplateManager,
      api: {
        hooks: {
          useGetList: useGetTemplates,
        },
      },
    },
  },
};
