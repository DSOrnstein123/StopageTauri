import { PLUGIN_ID } from "./identity";
import type { PluginManifest } from "@system/plugin-manager/plugin";
import { highlightSegmentConfig } from "./segments/highlight";

export const config = {
  id: PLUGIN_ID,
  name: "Block editor",
  segments: [highlightSegmentConfig],
} satisfies PluginManifest;
