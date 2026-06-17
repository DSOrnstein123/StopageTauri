import type {
  NodeController,
  NodeControllerInstance,
  NodeType,
} from "@system/registries/node";
import type { TabParams } from "./tabParams";

export interface Tab {
  tabId: string;
  params: TabParams;
  api: TabApi;
}

export type TabApi = {
  controller?: NodeControllerInstance;
};

export type TabApiMap<N extends NodeType> = {
  controller?: NodeController<N>;
};
