import { createContext } from "react";
import type { IDockviewPanelProps } from "dockview-core";

export const PanelContext = createContext<IDockviewPanelProps<
  Record<string, unknown>
> | null>(null);
