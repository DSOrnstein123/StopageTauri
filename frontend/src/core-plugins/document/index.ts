export * from "./public";
export { DocumentView };
import DocumentView from "./entries/nodes/document/components/DocumentView";
import { PLUGIN_ID } from "./entries/nodes/document/constants";
import type { PluginManifest } from "@system/plugin-manager/plugin";
import {
  TYPE as DOCUMENT_TYPE,
  config as documentConfig,
} from "./entries/nodes/document/definition";
import {
  TYPE as DOCUMENT_TEMPLATE_TYPE,
  config as documentTemplateConfig,
} from "./entries/nodes/document-template/definition";
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
