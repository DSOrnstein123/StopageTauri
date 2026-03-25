import type { IDockviewPanelProps } from "dockview-core";
import { PanelContext } from "./panelContext";
import type { PanelParamsRegistry } from "../panelRegistry";
import type { ReactNode } from "react";

export const PanelProvider = ({
  props,
  children,
}: {
  props: IDockviewPanelProps<PanelParamsRegistry[keyof PanelParamsRegistry]>;
  children: ReactNode;
}) => <PanelContext.Provider value={props}>{children}</PanelContext.Provider>;
