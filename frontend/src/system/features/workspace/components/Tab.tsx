import TabHeader from "@system/features/workspace/components/TabHeader";
import TabProvider from "@system/features/workspace/context/TabProvider";
import DynamicTabContent from "./DynamicTabContent";
import StaticTabContent from "./StaticTabContent";
import type { TabProps } from "../types/tabProps";

const Tab = (props: TabProps) => {
  const { tabId, mode, isActive, setTitle } = props;

  const value = {
    tabId: tabId,
    id: mode === "dynamic" ? props.nodeId : props.type,
    isActive: isActive,
    setTitle: setTitle,
  };
  console.log(value);
  return (
    <div className="flex h-full flex-col">
      <TabProvider props={value}>
        <TabHeader className="h-10" />

        <div className="flex-1">
          {mode == "dynamic" ? (
            <DynamicTabContent id={props.nodeId} />
          ) : (
            <StaticTabContent type={props.type} />
          )}
        </div>
      </TabProvider>
    </div>
  );
};

export default Tab;
