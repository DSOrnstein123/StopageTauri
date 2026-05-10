import FileHeader from "./FileHeader";
import FileProvider from "../context/FileProvider";
import FileNameLabel from "./FileNameLabel";
import FileContent from "./FileContent";

const File = ({ id }: { id: string }) => {
  const value = {
    id: id,
  };

  return (
    <FileProvider props={value}>
      <div className="relative h-full">
        <FileHeader className="fixed top-0 left-0 h-10 w-full" />
        <FileNameLabel className="absolute top-10 left-0" />

        <div className="h-full overflow-auto pt-10">
          <FileContent />
        </div>
      </div>
    </FileProvider>
  );
};

export default File;
