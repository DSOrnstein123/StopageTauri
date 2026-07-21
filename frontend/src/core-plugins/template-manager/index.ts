import type { PluginManifest } from "@system/plugin-manager/plugin";
import { PLUGIN_ID, TOOLS } from "./constants";
import useGetTemplatesQuery from "./entries/tools/template-manager/hooks/useGetTemplatesQuery";
import { templateManagerConfig } from "./entries/tools/template-manager/config";

declare module "@system/plugin-manager/plugin" {
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
  },
  api: {
    hooks: {
      useGetList: useGetTemplatesQuery,
    },
  },
} satisfies PluginManifest;
