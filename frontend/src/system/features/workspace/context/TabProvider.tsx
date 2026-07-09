import type { ReactNode } from "react";
import { TabContext } from "./TabContext";
import type { Tab } from "../classes/tab";

const TabProvider = ({
  value,
  children,
}: {
  value: Tab;
  children: ReactNode;
}) => {
  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
};

export default TabProvider;
