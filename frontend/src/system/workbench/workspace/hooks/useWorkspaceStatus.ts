import useWorkspaceStore from "../stores/useWorkspaceStore";

const useWorkspaceStatus = () => {
  return useWorkspaceStore((state) => state.status);
};

export default useWorkspaceStatus;
