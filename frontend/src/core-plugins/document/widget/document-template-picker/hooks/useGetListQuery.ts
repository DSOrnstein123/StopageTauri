import { useGetNodes } from "@system/features/node/shared/hooks/useGetNodes";
import { DOCUMENT_TEMPLATE_FILTER } from "../constants";

const useGetListQuery = () => {
  return useGetNodes(DOCUMENT_TEMPLATE_FILTER);
};

export default useGetListQuery;
