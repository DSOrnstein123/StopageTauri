import { templateService } from "@system/entry/node/template/service";
import type { ApplyTemplatePayload } from "@system/features/node/template/types/applyTemplatePayload";
import type { NodeType } from "@system/plugin-manager/plugin";

export const templateApi = {
  applyTemplate: <N extends NodeType>(payload: ApplyTemplatePayload) =>
    templateService.applyTemplate<N>(payload),
};
