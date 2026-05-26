import { nodeService } from "@system/domain/node/services";
import type {
  CreateNodePayload,
  NodeFilterOptions,
} from "@system/domain/node/types";
import { useWorkspaceStore } from "@system/lib/dockview/useWorkspaceStore";
import type { TabConfig } from "@system/tab-system/types";

export const systemApi = {
  workspace: {
    openTab: (config: TabConfig) => {
      useWorkspaceStore.getState().openTab(config);
    },
  },

  node: {
    get: (id: string) => nodeService.getDetail(id),
    getList: (options?: NodeFilterOptions) => nodeService.getList(options),
    create: (payload: CreateNodePayload) => nodeService.create(payload),
    rename: (id: string, name: string) => nodeService.updateName(id, name),
    updateContent: (id: string, newContent: Record<string, unknown>) =>
      nodeService.updateContent(id, newContent),
  },
};
