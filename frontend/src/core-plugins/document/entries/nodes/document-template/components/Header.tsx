import NameInput from "@system/shared/ui/custom/NameInput";
import useRename from "../hooks/useRename";
import useCurrentNodeNamePlaceholder from "@system/entry/categories/node/core/hooks/useNodeNamePlaceholder";

const Header = () => {
  const placeholder = useCurrentNodeNamePlaceholder();
  return <NameInput {...useRename()} placeholder={placeholder} />;
};

export default Header;
