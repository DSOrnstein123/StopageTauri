import type { PluginRegistry } from "./pluginRegistry";

export interface Plugin {
  id: string;
  name: string;

  onRegister: (ctx: PluginRegistry) => void;
}
