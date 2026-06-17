import type { BaseController } from "../classes/baseController";

export type Controller = new () => BaseController;
export type ControllerClass = new (...args: unknown[]) => BaseController;
