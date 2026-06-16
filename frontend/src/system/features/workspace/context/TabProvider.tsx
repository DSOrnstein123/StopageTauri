import type { ReactNode } from "react";
import { TabContext } from "./TabContext";

const TabProvider = ({
  props,
  children,
}: {
  props: TabContext;
  children: ReactNode;
}) => {
  return <TabContext.Provider value={props}>{children}</TabContext.Provider>;
};

export default TabProvider;
