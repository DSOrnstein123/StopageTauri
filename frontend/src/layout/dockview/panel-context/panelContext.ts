import { createContext } from "react";
import type { IDockviewPanelProps } from "dockview-core";
import type { PanelParamsRegistry } from "../../../registry/featureRegistry";

export const PanelContext = createContext<IDockviewPanelProps<
  PanelParamsRegistry[keyof PanelParamsRegistry]
> | null>(null);
