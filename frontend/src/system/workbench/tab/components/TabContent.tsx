import { useStore } from "zustand";
import { useTabContext } from "../context/TabContext";
import type { TabProps } from "../types/tabProps";
import ToolTab from "./ToolTab";
import Node from "@system/entry/categories/node/core/components/Node";

const TabContent = ({
  tabProps,
  className,
}: {
  tabProps: TabProps;
  className: string;
}) => {
  const { entryCategory } = tabProps;
  const tab = useTabContext();
  // const entryStatus = useStore(tab.tabStore, (state) => state.entryStatus);

  // if (entryStatus === "idle") return null;

  return (
    <div className={className}>
      {entryCategory == "node" ? (
        <Node id={tabProps.nodeId} store={tab.entryStore} api={tab.entryApi} />
      ) : (
        <ToolTab toolType={tabProps.toolType} />
      )}
    </div>
  );
};

export default TabContent;
