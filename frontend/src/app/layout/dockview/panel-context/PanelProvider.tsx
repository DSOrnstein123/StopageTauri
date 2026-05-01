import type { IDockviewPanelProps } from "dockview-core";
import { PanelContext } from "./panelContext";
import type { ReactNode } from "react";

export const PanelProvider = <T extends Record<string, unknown>>({
  props,
  children,
}: {
  props: IDockviewPanelProps<T>;
  children: ReactNode;
}) => <PanelContext.Provider value={props}>{children}</PanelContext.Provider>;
