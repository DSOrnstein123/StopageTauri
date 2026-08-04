import type { WorkbenchZone } from "@system/workbench/core/types/workbenchZone";
import { Context } from "./Context";
import type { ReactNode } from "react";

export const Provider = ({
  zone,
  children,
}: {
  zone: WorkbenchZone;
  children: ReactNode;
}) => {
  return <Context.Provider value={zone}>{children}</Context.Provider>;
};
