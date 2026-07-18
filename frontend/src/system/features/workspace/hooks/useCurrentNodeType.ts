import useCurrentEntry from "@system/features/workspace/hooks/useCurrentEntry";

const useCurrentNodeType = () => {
  const currentEntry = useCurrentEntry();

  if (currentEntry.entryCategory != "node") {
    throw new Error("Current entry is not a node.");
  }

  return currentEntry.nodeType;
};

export default useCurrentNodeType;
