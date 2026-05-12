import Node from "@system/domain/node/components/Node";
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
    <TabProvider props={value}>
      <Node id={props.params.id} />
    </TabProvider>
  );
};

export default Tab;
