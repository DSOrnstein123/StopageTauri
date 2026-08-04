import { useMemo } from "react";
import { useActiveTab } from "../../workspace/hooks/useActiveTab";
import Content from "./components/Content";
import { Provider } from "./context/Provider";
import type { Context } from "./context/Context";

export const View = () => {
  const activeTab = useActiveTab();

  const props = useMemo<Context>(
    () => ({
      entryMetadata: activeTab?.currentEntry,
      entryStore: activeTab?.entryStore,
      entryApi: activeTab?.entryApi,
    }),
    [],
  );

  return <Provider props={}></Provider>;
};
