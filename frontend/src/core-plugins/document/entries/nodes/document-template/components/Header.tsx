import NameInput from "@system/ui/custom/NameInput";
import useRename from "../hooks/useRename";
import useCurrentNodeNamePlaceholder from "@system/features/node/shared/hooks/useNodeNamePlaceholder";

const Header = () => {
  const placeholder = useCurrentNodeNamePlaceholder();
  return <NameInput {...useRename()} placeholder={placeholder} />;
};

export default Header;
