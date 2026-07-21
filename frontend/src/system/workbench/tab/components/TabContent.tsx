import NodeTab from "./NodeTab";
import ToolTab from "./ToolTab";
import type { TabProps } from "../../workspace/types/tabProps";

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
