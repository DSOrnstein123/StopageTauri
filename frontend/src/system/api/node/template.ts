import { templateService } from "@system/entry/categories/node/kinds/template/service";
import type { ApplyTemplatePayload } from "@system/entry/categories/node/kinds/template/types/applyTemplatePayload";
import type { NodeType } from "@system/plugin-manager/plugin";

export const templateApi = {
  applyTemplate: <N extends NodeType>(payload: ApplyTemplatePayload) =>
    templateService.applyTemplate<N>(payload),
};
