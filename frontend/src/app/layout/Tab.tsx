import Node from "@system/domain/node/components/Node";
import TabHeader from "@system/tab-system/components/TabHeader";
import TabProvider from "@system/tab-system/context/TabProvider";
import type { IDockviewPanelProps } from "dockview-core";
import { useEffect, useState } from "react";

interface TabParams {
  id: string;
}

const Tab = (props: IDockviewPanelProps<TabParams>) => {
  const [isActive, setIsActive] = useState(props.api.isActive);

  useEffect(() => {
    const disposable = props.api.onDidActiveChange((event) => {
      setIsActive(event.isActive);
    });

    return () => disposable.dispose();
  }, [props.api]);

  const value = {
    id: props.api.id,
    isActive: isActive,
    setTitle: (title: string) => props.api.setTitle(title),
  };

  return (
    <div className="flex h-full flex-col">
      <TabProvider props={value}>
        <TabHeader className="h-10" />
        <Node className="flex-1" id={props.params.id} />
      </TabProvider>
    </div>
  );
};

export default Tab;
