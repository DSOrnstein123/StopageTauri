import useGetNameQuery from "./useGetNameQuery";
import useCurrentNodeId from "@system/features/workspace/hooks/useCurrentNodeId";

const useGetCurrentNameQuery = () => {
  const id = useCurrentNodeId();
  return useGetNameQuery(id);
};

export default useGetCurrentNameQuery;
