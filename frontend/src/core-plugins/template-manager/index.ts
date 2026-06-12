import type { PluginManifest } from "@system/registries/plugin";
import TemplateManager from "./components/TemplateManager";
import handleOpenTemplateManager from "./handlers/handleOpenTemplateManager";
import { NODES, PLUGIN_ID } from "./constants";
import useGetTemplatesQuery from "./hooks/useGetTemplatesQuery";
import { systemApi } from "@system/api";
import DocumentTemplatePicker from "./components/DocumentTemplatePicker";
import TemplateView from "./components/TemplateView";
import { DocumentTemplateDetailSchema } from "./schemas/documentTemplateSchema";

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
  nodes: {
    [NODES.DOCUMENT_TEMPLATE]: {
      component: TemplateView,
      schema: DocumentTemplateDetailSchema,
    },
  },
  onRegister: () => {
    systemApi.plugin.registerSlot("document", {
      emptyPlaceholder: DocumentTemplatePicker,
    });
  },
} satisfies PluginManifest;
