import type { CSSProperties } from "react";

interface TaskProps {
  id: string;
  title: string;
  className: string;
  status?: "todo" | "in-progress" | "done";
  color?: string;
  style: CSSProperties;
}

const Task = ({
  id,
  title,
  className,
  status = "todo",
  color = "grey",
  style,
}: TaskProps) => {
  return (
    <div
      className={`absolute top-4 left-0 z-10 h-4 w-10 border bg-${color} rounded-b-lg ${className}`}
      style={style}
    >
      {title}
    </div>
  );
};

export default Task;
