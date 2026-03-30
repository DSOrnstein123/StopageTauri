interface TaskProps {
  id: string;
  title: string;
  status?: "todo" | "in-progress" | "done";
  color?: string;
}

const Task = ({ id, title, status = "todo", color = "grey" }: TaskProps) => {
  return <div className={`h-4 w-10 bg-${color} rounded-b-lg`}>Task</div>;
};

export default Task;
