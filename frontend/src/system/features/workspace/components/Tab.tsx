import TabHeader from "@system/features/workspace/components/TabHeader";
import TabProvider from "@system/features/workspace/context/TabProvider";
import DynamicTabContent from "./DynamicTabContent";
import StaticTabContent from "./StaticTabContent";
import type { TabConfig } from "../types/tabConfig";

const Tab = (props: TabConfig) => {
  const { mode, isActive, setTitle } = props;

  const value = {
    id: mode === "dynamic" ? props.nodeId : props.type,
    isActive: isActive,
    setTitle: setTitle,
  };

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
