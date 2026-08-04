import type { ReactNode } from "react";
import { Context } from "./Context";

export const Provider = ({
  props,
  children,
}: {
  props: Context;
  children: ReactNode;
}) => {
  return <Context.Provider value={props}>{children}</Context.Provider>;
};
