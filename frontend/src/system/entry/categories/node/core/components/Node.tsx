import NodeContent from "./NodeContent";
import NodeNameLabel from "./NodeNameLabel";
import { useGetNodeDetailQuery } from "../hooks/useGetNodeDetailQuery";
import NodeProvider from "../context/NodeProvider";
import type { EntryTab } from "@system/workbench/tab/entry-tab/EntryTab";
import { useEntryTabContext } from "@system/workbench/tab/entry-tab/hooks/useEntryTabContext";

const Node = ({ id }: { id: string }) => {
  const { data } = useGetNodeDetailQuery(id);
  const tab = useEntryTabContext();

  if (!data) return null;
  //TODO: add useEntryTabContext
  const value = {
    id: id,
    store: tab.entryStore,
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
