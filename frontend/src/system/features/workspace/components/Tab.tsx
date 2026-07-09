import TabHeader from "@system/features/workspace/components/TabHeader";
import TabProvider from "@system/features/workspace/context/TabProvider";
import NodeTab from "./NodeTab";
import ToolTab from "./ToolTab";
import type { TabProps } from "../types/tabProps";
import { systemApi } from "@system/api";

const Tab = (props: TabProps) => {
  const { tabId, entryCategory } = props;
  const tab = systemApi.workspace.getTab(tabId);
  if (!tab) return;

  return (
    <div className="flex h-full flex-col">
      <TabProvider value={tab}>
        <TabHeader className="h-10" />

        <div className="flex-1">
          {entryCategory == "node" ? (
            <NodeTab nodeId={props.nodeId} />
          ) : (
            <ToolTab toolType={props.toolType} />
          )}
        </div>
      </TabProvider>
    </div>
  );
};

export default Tab;
