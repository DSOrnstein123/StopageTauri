import useWorkspaceStore from "../../core/store/useWorkbenchStore";

const useActiveTabId = () => {
  return useWorkspaceStore((state) => state.activeTabId);
};

export default useActiveTabId;
