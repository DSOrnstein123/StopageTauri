import useWorkspaceStore from "../../core/store/useWorkbenchStore";

const useWorkspaceStatus = () => {
  return useWorkspaceStore((state) => state.status);
};

export default useWorkspaceStatus;
