import type { WorkbenchZone } from "@system/workbench/core/types/workbenchZone";
import { createContext, useContext as useReactContext } from "react";

export const Context = createContext<WorkbenchZone | null>(null);

export const useContext = () => {
  const context = useReactContext(Context);
  if (!context)
    throw new Error(
      "Must use useWorkbenchZoneContext inside WorkbenchZoneProvider",
    );
  return context;
};
