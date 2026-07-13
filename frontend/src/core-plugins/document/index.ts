export * from "./public";

import DocumentSidebar from "./entries/nodes/document/components/DocumentTOCAuxiliary";
import DocumentView from "./entries/nodes/document/components/DocumentView";
import { PLUGIN_ID } from "./entries/nodes/document/constants";
import type { PluginManifest } from "@system/registries/plugin";
import {
  config as documentConfig,
  TYPE as DOCUMENT_TYPE,
} from "./entries/nodes/document/definition";
import {
  config as documentTemplateConfig,
  TYPE as DOCUMENT_TEMPLATE_TYPE,
} from "./entries/nodes/document-template/definition";

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
} satisfies PluginManifest;
