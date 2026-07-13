import NodeNameInput from "./NodeNameInput";

const NodeNameLabel = ({ className }: { className: string }) => {
  return (
    <div
      className={`${className} z-10 flex rounded-br-sm border-r border-b bg-white py-1 pl-2`}
    >
      <NodeNameInput />
    </div>
  );
};

export default NodeNameLabel;
