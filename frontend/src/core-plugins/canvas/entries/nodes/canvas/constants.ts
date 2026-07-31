import type { CreateNodePayload } from "@system/entry/categories/node/core/types/payload";
import { TYPE } from "./identity";

export const DEFAULT_CANVAS_VALUES: CreateNodePayload = {
  name: "Untitled",
  kind: "file",
  type: TYPE,
  data: {},
};

export const PAN_ON_DRAG = [2];

export const ZOOM_SLIDER_STYLE = {
  top: "auto",
  left: "auto",
  bottom: "-4px",
  right: "-4px",
};
