import FileNameInput from "./FileNameInput";

const FileNameLabel = ({ className }: { className: string }) => {
  return (
    <div
      className={`${className} z-10 flex rounded-br-sm border-r border-b bg-white py-1 pl-2`}
    >
      <FileNameInput className="bg-white" />
    </div>
  );
};

export default FileNameLabel;
