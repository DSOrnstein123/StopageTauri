import { icons } from "lucide-react";

const LuicideDynamicIcon = ({
  name,
  size = 24,
  color = "currentColor",
  className = "",
}: {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}) => {
  const IconComponent = icons[name as keyof typeof icons];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Lucide.`);
    return (
      <icons.CircleQuestionMark
        size={size}
        color={color}
        className={className}
      />
    );
  }

  return <IconComponent size={size} color={color} className={className} />;
};

export default LuicideDynamicIcon;
