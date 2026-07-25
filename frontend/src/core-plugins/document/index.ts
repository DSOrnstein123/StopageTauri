export * from "./public";
export { default as DocumentView } from "./entries/nodes/document/View";
import { PLUGIN_ID } from "./entries/nodes/document/constants";
import type { PluginManifest } from "@system/plugin-manager/plugin";
import { config as documentConfig } from "./entries/nodes/document/config";
import { TYPE as DOCUMENT_TYPE } from "./entries/nodes/document/identity";
import { config as documentTemplateConfig } from "./entries/nodes/document-template/config";
import { TYPE as DOCUMENT_TEMPLATE_TYPE } from "./entries/nodes/document-template/identity";
import { systemApi } from "@system/api";
import { DocumentTemplatePickerWidget } from "./widget/document-template-picker/public/components";

declare module "@system/plugin-manager/plugin" {
  interface PluginRegistryMap {
    "core.document": {
      entries: {
        nodes: {
          [DOCUMENT_TYPE]: typeof documentConfig;
          [DOCUMENT_TEMPLATE_TYPE]: typeof documentTemplateConfig;
        };
      };
    };
  }
}

export const DocumentPlugin = {
  id: PLUGIN_ID,
  name: "Document",
  entries: {
    nodes: {
      [DOCUMENT_TYPE]: documentConfig,
      [DOCUMENT_TEMPLATE_TYPE]: documentTemplateConfig,
    },
  },
  onRegister: () => {
    systemApi.plugin.registerSlot("document", {
      emptyPlaceholder: DocumentTemplatePickerWidget,
    });
  },
} satisfies PluginManifest;
