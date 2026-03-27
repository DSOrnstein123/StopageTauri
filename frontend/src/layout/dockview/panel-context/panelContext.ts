import { createContext } from "react";
import type { IDockviewPanelProps } from "dockview-core";
import type { PanelParamsRegistry } from "../panelRegistry";

export const PanelContext = createContext<IDockviewPanelProps<
  PanelParamsRegistry[keyof PanelParamsRegistry]
> | null>(null);
