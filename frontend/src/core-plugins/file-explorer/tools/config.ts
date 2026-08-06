import type { ToolConfig } from "@system/plugin-manager/tool";
import FileExplorer from "./components/FileExplorer";
import { TYPE } from "./identity";

export const config = {
  type: TYPE,
  view: FileExplorer,
} satisfies ToolConfig;
