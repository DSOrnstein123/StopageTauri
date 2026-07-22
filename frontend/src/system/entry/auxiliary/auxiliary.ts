import type { IconData } from "@system/shared/schemas/iconData";
import type { BaseController } from "@system/workbench/tab/classes/baseController";
import type { ComponentType } from "react";
import type { StoreApi } from "zustand";

export interface AuxiliaryConfig {
  icon?: IconData;
  segments: Record<string, SegmentConfig>;
}

export interface SegmentConfig {
  icon?: IconData;
  view: ComponentType;
  createController?: () => BaseController;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createStore?: () => StoreApi<any>;
}
