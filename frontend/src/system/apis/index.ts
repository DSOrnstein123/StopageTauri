import { workspaceApi } from "./workspace";
import { nodeApi } from "./node";

export const systemApi = {
  workspace: { ...workspaceApi },
  node: { ...nodeApi },
};
