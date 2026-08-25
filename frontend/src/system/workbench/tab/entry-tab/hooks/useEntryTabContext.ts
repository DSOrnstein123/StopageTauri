import { useTabContext } from "@system/workbench/tab/context/TabContext";

export const useEntryTabContext = () => {
  const tab = useTabContext();

  if (tab.kind !== "entry") {
    throw new Error("Current tab is not an EntryTab");
  }

  return tab;
};
