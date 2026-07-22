import { systemApi } from "@system/api";
import useCurrentNodeType from "@system/workbench/tab/hooks/useCurrentNodeType";

const useCurrentNodeNamePlaceholder = () => {
  const nodeType = useCurrentNodeType();
  return systemApi.plugin.getNodeNamePlaceholder(nodeType);
};

export default useCurrentNodeNamePlaceholder;
