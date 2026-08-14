import useWorkspaceStore from "../../core/store/useWorkbenchStore";

const useActiveTabId = () => {
  return useWorkspaceStore((state) => state.activeTabIdByZone.workspace);
};

export default useActiveTabId;
