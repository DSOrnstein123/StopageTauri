import type { IconData } from "@system/icon/schemas/iconData";
import LuicideDynamicIcon from "./LuicideDynamicIcon";

const Icon = ({ data }: { data: IconData }) => {
  if (data.type === "lucide") return <LuicideDynamicIcon name={data.value} />;
  return null;
};

export default Icon;
