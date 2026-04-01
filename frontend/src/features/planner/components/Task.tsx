import type { CSSProperties } from "react";

interface TaskProps {
  id: string;
  title: string;
  className: string;
  style: CSSProperties;
  status?: "todo" | "in-progress" | "done";
  color?: string;
}

const Task = ({
  id,
  title,
  className,
  style,
  status = "todo",
  color = "grey",
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
