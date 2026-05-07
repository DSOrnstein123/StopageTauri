import { useTabContext } from "@shared/tab-context/TabContext";
import { useFileContext } from "../context/FileContext";
import useFileName from "../hooks/useFileName";

const FileNameLabel = ({ className }: { className: string }) => {
  const { id } = useFileContext();
  const { setTitle } = useTabContext();
  const { currentName } = useFileName(id, setTitle);

  return (
    <div
      className={`${className} border-r border-b`}
      contentEditable
      spellCheck={false}
    >
      {currentName}
    </div>
  );
};

export default FileNameLabel;
