import { useGetNodes } from "@system/entry/categories/node/core/hooks/useGetNodes";
import { DOCUMENT_TEMPLATE_FILTER } from "../constants";

const useGetListQuery = () => {
  return useGetNodes(DOCUMENT_TEMPLATE_FILTER);
};

export default useGetListQuery;
