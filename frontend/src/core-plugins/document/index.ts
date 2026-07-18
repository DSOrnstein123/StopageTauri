export * from "./public";

import DocumentSidebar from "./entries/nodes/document/components/DocumentTOCAuxiliary";
import DocumentView from "./entries/nodes/document/components/DocumentView";
import { PLUGIN_ID } from "./entries/nodes/document/constants";
import type { PluginManifest } from "@system/registries/plugin";
import { config as documentConfig } from "./entries/nodes/document/config";
import { config as documentTemplateConfig } from "./entries/nodes/document-template/config";
import { systemApi } from "@system/api";
import { DocumentTemplatePickerWidget } from "./widget/document-template-picker/public/components";
import { TYPE as DOCUMENT_TEMPLATE_TYPE } from "./entries/nodes/document-template/identity";
import { TYPE as DOCUMENT_TYPE } from "./entries/nodes/document/identity";

export { DocumentView, DocumentSidebar };

declare module "@system/registries/plugin" {
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
