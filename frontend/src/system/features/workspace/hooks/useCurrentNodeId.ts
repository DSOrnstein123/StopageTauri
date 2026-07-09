import useCurrentEntry from "./useCurrentEntry";

const useCurrentNodeId = () => {
  const currentEntry = useCurrentEntry();
  return currentEntry.entryCategory == "node" ? currentEntry.nodeId : undefined;
};

export default useCurrentNodeId;
