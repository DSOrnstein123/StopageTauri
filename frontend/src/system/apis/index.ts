import { workspaceApi } from "./workspace";
import { nodeApi } from "./node";
import { pluginApi } from "./plugin";

export const systemApi = {
  workspace: { ...workspaceApi },
  plugin: { ...pluginApi },
  node: { ...nodeApi },
};
