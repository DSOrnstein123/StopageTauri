import type { TabProps } from "../types/tabProps";
import NodeTab from "./NodeTab";
import ToolTab from "./ToolTab";

const TabContent = ({
  tabProps,
  className,
}: {
  tabProps: TabProps;
  className: string;
}) => {
  const { entryCategory } = tabProps;

  return (
    <div className={className}>
      {entryCategory == "node" ? (
        <NodeTab nodeId={tabProps.nodeId} />
      ) : (
        <ToolTab toolType={tabProps.toolType} />
      )}
    </div>
  );
};

export default TabContent;
