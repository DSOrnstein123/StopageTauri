import type { ReactNode } from "react";
import { TabContext, type ITabContext } from "./TabContext";

const TabProvider = ({
  props,
  children,
}: {
  props: ITabContext;
  children: ReactNode;
}) => {
  return <TabContext.Provider value={props}>{children}</TabContext.Provider>;
};

export default TabProvider;
