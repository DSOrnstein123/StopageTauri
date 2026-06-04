import type { IconData } from "@system/schemas/iconData";
import LuicideDynamicIcon from "./LuicideDynamicIcon";

const Icon = ({ data, size }: { data: IconData; size?: number }) => {
  if (data.type === "lucide")
    return <LuicideDynamicIcon name={data.value} size={size} />;
  return null;
};

export default Icon;
