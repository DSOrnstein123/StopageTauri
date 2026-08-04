import { systemApi } from "@system/api";
import useActiveTabId from "./useActiveTabId";

export const useActiveTab = () => {
  const activeTabId = useActiveTabId();
  const activeTab = activeTabId
    ? systemApi.workbench.getTab(activeTabId)
    : null;
  return activeTab;
};
