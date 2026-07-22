import useCurrentNodeNamePlaceholder from "../../../categories/node/kinds/template/hooks/useNodeNamePlaceholder";
import useRenameNode from "../../../categories/node/kinds/template/hooks/useRenameNode";
import NameInput from "@system/shared/ui/custom/NameInput";

const NodeNameInput = (props: {
  textClassName?: string;
  placeholderClassName?: string;
  inputClassName?: string;
}) => {
  const placeholder = useCurrentNodeNamePlaceholder();
  return (
    <NameInput {...useRenameNode()} placeholder={placeholder} {...props} />
  );
};

export default NodeNameInput;
