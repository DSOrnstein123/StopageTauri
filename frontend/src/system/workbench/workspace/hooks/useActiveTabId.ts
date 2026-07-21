import useWorkspaceStore from "../stores/useWorkspaceStore";

const useActiveTabId = () => {
  return useWorkspaceStore((state) => state.activeTabId);
};

export default useActiveTabId;
