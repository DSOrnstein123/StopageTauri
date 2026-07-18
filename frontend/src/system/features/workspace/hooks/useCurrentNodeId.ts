import useCurrentEntry from "./useCurrentEntry";

const useCurrentNodeId = () => {
  const currentEntry = useCurrentEntry();

  if (currentEntry.entryCategory != "node") {
    throw new Error("Current entry is not a node.");
  }

  return currentEntry.nodeId;
};

export default useCurrentNodeId;
