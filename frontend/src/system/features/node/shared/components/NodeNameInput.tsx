import useCurrentNodeNamePlaceholder from "../hooks/useNodeNamePlaceholder";
import useRenameNode from "../hooks/useRenameNode";
import NameInput from "@system/ui/custom/NameInput";

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
