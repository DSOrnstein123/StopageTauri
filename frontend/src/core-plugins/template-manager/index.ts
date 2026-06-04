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
        "document-template": Record<string, never>;
      };
    };
  }
}

export const TemplateManagerPlugin = {
  id: PLUGIN_ID,
  name: "Template Manager",
  component: TemplateManager,
  actionButtons: [
    {
      id: "open-template-manager",
      icon: {
        type: "lucide",
        value: "LayoutTemplate",
      },
      action: () => {
        handleOpenTemplateManager(PLUGIN_ID);
      },
    },
  ],
  api: {
    hooks: {
      useGetList: useGetTemplates,
    },
  },
} satisfies Plugin;
