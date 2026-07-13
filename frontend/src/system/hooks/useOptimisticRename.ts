import useDebouncedCallback from "./useDebouncedCallback";

interface UseRenameOptions {
  onOptimisticUpdate: (newName: string) => void;
  onCommit: (newName: string) => Promise<void>;
}

const useOptimisticRename = ({
  onOptimisticUpdate,
  onCommit,
}: UseRenameOptions) => {
  const { debounced, flush } = useDebouncedCallback(onCommit);

  const rename = (newName: string) => {
    onOptimisticUpdate(newName);
    debounced(newName);
  };

  return { rename, commit: flush };
};

export default useOptimisticRename;
