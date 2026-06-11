import type { Plugin } from "@system/registries/plugin";
import TemplateManager from "./components/TemplateManager";
import handleOpenTemplateManager from "./handlers/handleOpenTemplateManager";
import { PLUGIN_ID } from "./constants";
import useGetTemplatesQuery from "./hooks/useGetTemplatesQuery";
import { systemApi } from "@system/apis";
import DocumentTemplatePicker from "./components/DocumentTemplatePicker";

declare module "@system/registries/plugin" {
  interface PluginRegistryMap {
    "core.template-manager": {
      api: {
        hooks: {
          useGetList: typeof useGetTemplatesQuery;
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
  name: "Template manager",
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
      useGetList: useGetTemplatesQuery,
    },
  },
  onRegister: () => {
    systemApi.plugin.registerSlot("document", {
      emptyPlaceholder: DocumentTemplatePicker,
    });
    console.log("ok");
  },
} satisfies Plugin;
