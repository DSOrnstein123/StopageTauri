import { nodeService } from "@system/features/node/services";
import type {
  CreateNodePayload,
  NodeFilterOptions,
} from "@system/features/node/types";

export const nodeApi = {
  get: (id: string) => nodeService.getDetail(id),
  getList: (options?: NodeFilterOptions) => nodeService.getList(options),
  create: (payload: CreateNodePayload) => nodeService.create(payload),
  rename: (id: string, name: string) => nodeService.updateName(id, name),
  updateData: (id: string, newData: Record<string, unknown>) =>
    nodeService.updateData(id, newData),
};
