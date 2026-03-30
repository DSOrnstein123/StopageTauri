interface TaskProps {
  id: string;
  title: string;
  className: string;
  status?: "todo" | "in-progress" | "done";
  color?: string;
}

const Task = ({
  id,
  title,
  className,
  status = "todo",
  color = "grey",
}: TaskProps) => {
  return (
    <div
      className={`absolute top-4 left-0 z-10 h-4 w-10 bg-${color} rounded-b-lg ${className}`}
    >
      Task
    </div>
  );
};

export default Task;
