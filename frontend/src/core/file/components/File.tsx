import type { IDockviewPanelProps } from "dockview-core";
import FileHeader from "./FileHeader";
import FileContent from "./FileContent";

interface FilePanelParams {
  id: string;
}

const File = (props: IDockviewPanelProps<FilePanelParams>) => {
  const { id } = props.params;

  return (
    <div className="relative">
      <FileHeader className="fixed top-0 left-0" />

      <FileContent id={id} />
    </div>
  );
};

export default File;
