import { useContext } from "react";
import { PanelContext } from "./panelContext";

export const usePanelContext = () => {
  const context = useContext(PanelContext);
  if (!context) throw new Error("Must use useMyPanel inside PanelProvider");
  return context;
};
