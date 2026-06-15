import useWorkspaceStore from "../stores/useWorkspaceStore";

const useIsActiveTab = (tabId: string) => {
  const isActiveTab = useWorkspaceStore((state) => state.activeTabId === tabId);

  return isActiveTab;
};

export default useIsActiveTab;
