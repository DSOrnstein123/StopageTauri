import useWorkspaceStore from "../../core/store/useWorkspaceStore";

const useWorkspaceStatus = () => {
  return useWorkspaceStore((state) => state.status);
};

export default useWorkspaceStatus;
