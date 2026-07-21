import type { EntryApi, EntryType } from "@system/plugin-manager/plugin";
import useTab from "./useTab";

const useTabEntryApi = <E extends EntryType>() => {
  const tab = useTab();
  return tab.entryApi as EntryApi<E>;
};

export default useTabEntryApi;
