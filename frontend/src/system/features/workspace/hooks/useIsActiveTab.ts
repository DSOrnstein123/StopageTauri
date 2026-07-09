import useWorkspaceStore from "../stores/useWorkspaceStore";
import useTabId from "./useTabId";

const useIsActiveTab = () => {
  const tabId = useTabId();
  const isActiveTab = useWorkspaceStore((state) => state.activeTabId === tabId);
  return isActiveTab;
};

export default useIsActiveTab;
