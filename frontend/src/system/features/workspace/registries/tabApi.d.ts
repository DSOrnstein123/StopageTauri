import type {
  NodeController,
  NodeControllerInstance,
  NodeType,
} from "@system/registries/node";
import type { BaseController } from "./baseController";

export type Controller = new () => BaseController;
export type ControllerClass = new (...args: unknown[]) => BaseController;

export type TabApi = {
  controller?: NodeControllerInstance;
};

export type TabApiMap<N extends NodeType> = {
  controller?: NodeController<N>;
};
