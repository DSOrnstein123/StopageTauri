import { useContext } from "react";
import { PanelContext } from "./panelContext";
import type { IDockviewPanelProps } from "dockview-core";

export const usePanelContext = <
  T extends Record<string, unknown> = Record<string, unknown>,
>() => {
  const context = useContext(PanelContext);
  if (!context) throw new Error("Must use useMyPanel inside PanelProvider");
  return context as IDockviewPanelProps<T>;
};
