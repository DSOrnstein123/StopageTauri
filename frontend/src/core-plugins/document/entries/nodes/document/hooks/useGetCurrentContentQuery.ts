import useCurrentNodeId from "@system/workbench/tab/hooks/useCurrentNodeId";
import useContentQuery from "./useGetContentQuery";

const useGetCurrentContentQuery = () => {
  const id = useCurrentNodeId();
  return useContentQuery(id);
};

export default useGetCurrentContentQuery;
