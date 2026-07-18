import { templateService } from "@system/features/node/template/service";
import type { ApplyTemplatePayload } from "@system/features/node/template/types/applyTemplatePayload";
import type { NodeType } from "@system/registries/plugin";

export const templateApi = {
  applyTemplate: <N extends NodeType>(payload: ApplyTemplatePayload) =>
    templateService.applyTemplate<N>(payload),
};
