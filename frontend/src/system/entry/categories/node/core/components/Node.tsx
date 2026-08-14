import NodeContent from "./NodeContent";
import NodeNameLabel from "./NodeNameLabel";
import { useGetNodeDetailQuery } from "../hooks/useGetNodeDetailQuery";
import NodeProvider from "../context/NodeProvider";
import { useTabContext } from "@system/workbench/tab/context/TabContext";
import type { EntryTab } from "@system/workbench/tab/entry-tab/EntryTab";

const Node = ({ id }: { id: string }) => {
  const { data } = useGetNodeDetailQuery(id);
  const tab = useTabContext();

  if (!data) return null;
  //TODO: add useEntryTabContext
  const value = {
    id: id,
    store: tab.store,
    api: (tab as EntryTab).entryApi,
  };

  return (
    <NodeProvider props={value}>
      <div className={`relative h-full overflow-auto`}>
        <NodeNameLabel className="fixed top-18.75 left-0" />

        <div className="h-full w-full">
          <NodeContent data={data} />
        </div>
      </div>
    </NodeProvider>
  );
};

export default Node;
