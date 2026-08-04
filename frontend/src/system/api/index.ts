import { workbenchApi } from "./workbench";
import { nodeApi } from "./node";
import { pluginApi } from "./plugin";

export const systemApi = {
  workbench: { ...workbenchApi },
  plugin: { ...pluginApi },
  node: { ...nodeApi },
};
