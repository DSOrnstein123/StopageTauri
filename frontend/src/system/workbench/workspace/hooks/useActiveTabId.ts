import useWorkspaceStore from "../../core/store/useWorkspaceStore";

const useActiveTabId = () => {
  return useWorkspaceStore((state) => state.activeTabId);
};

export default useActiveTabId;
