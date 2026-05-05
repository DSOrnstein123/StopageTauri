import TabProvider from "@shared/tab-context/TabProvider";
import File from "@entities/file/components/File";
import type { IDockviewPanelProps } from "dockview-core";
import { useEffect, useState } from "react";
import { resolveComponent } from "./resolveComponent";

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
      <File id={props.params.id} resolveComponent={resolveComponent} />
    </TabProvider>
  );
};

export default Tab;
