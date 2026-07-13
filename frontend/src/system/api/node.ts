import { nodeKeys } from "@system/features/node/shared/keys";
import { nodeService } from "@system/features/node/shared/services";
import type {
  CreateNodePayload,
  NodeListOptions,
} from "@system/features/node/shared/types";
import type { NodeDetailMap } from "@system/registries/node";
import type { NodeType } from "@system/registries/plugin";

export const nodeApi = {
  keys: nodeKeys,

  get: (id: string) => nodeService.getDetail(id),
  getList: (options?: NodeListOptions) => nodeService.getList(options),
  create: (payload: CreateNodePayload) => nodeService.create(payload),
  rename: (id: string, name: string) => nodeService.updateName(id, name),
  updateData: <N extends NodeType>(
    id: string,
    newData: Partial<NodeDetailMap<N>["data"]>,
  ) => nodeService.patchData(id, newData),
};
