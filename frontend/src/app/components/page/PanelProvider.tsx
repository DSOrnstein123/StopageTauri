import type { IDockviewPanelProps } from "dockview-core";
import type { DocParams } from "./docParams";
import { PanelContext } from "./panelContext";

export const PanelProvider = ({
  props,
  children,
}: {
  props: IDockviewPanelProps<DocParams>;
  children: React.ReactNode;
}) => <PanelContext.Provider value={props}>{children}</PanelContext.Provider>;
