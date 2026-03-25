import type { IDockviewPanelProps } from "dockview-core";
import { createContext } from "react";
import type { DocParams } from "./docParams";

export const PanelContext =
  createContext<IDockviewPanelProps<DocParams> | null>(null);
