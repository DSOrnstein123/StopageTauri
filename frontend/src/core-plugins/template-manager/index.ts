import type { PluginManifest } from "@system/registries/plugin";
import { NODES, PLUGIN_ID, TOOLS } from "./constants";
import useGetTemplatesQuery from "./entries/tools/template-manager/hooks/useGetTemplatesQuery";
import { systemApi } from "@system/api";
import { documentTemplateConfig } from "./entries/nodes/document-template/config";
import { templateManagerConfig } from "./entries/tools/template-manager/config";
import DocumentTemplatePicker from "./entries/tools/template-manager/components/DocumentTemplatePicker";

declare module "@system/registries/plugin" {
  interface PluginRegistryMap {
    "core.template-manager": {
      api: {
        hooks: {
          useGetList: typeof useGetTemplatesQuery;
        };
      };
      entries: {
        tools: {
          [TOOLS.TEMPLATE_MANAGER]: typeof templateManagerConfig;
        };
        nodes: {
          [NODES.DOCUMENT_TEMPLATE]: typeof documentTemplateConfig;
        };
      };
    };
  }
}

export const TemplateManagerPlugin = {
  id: PLUGIN_ID,
  name: "Template manager",
  entries: {
    tools: {
      [TOOLS.TEMPLATE_MANAGER]: templateManagerConfig,
    },
    nodes: {
      [NODES.DOCUMENT_TEMPLATE]: documentTemplateConfig,
    },
  },
  api: {
    hooks: {
      useGetList: useGetTemplatesQuery,
    },
  },
  onRegister: () => {
    systemApi.plugin.registerSlot("document", {
      emptyPlaceholder: DocumentTemplatePicker,
    });
  },
} satisfies PluginManifest;
