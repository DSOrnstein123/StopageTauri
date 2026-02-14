import Highlighter from "./Highlighter";
import SearchToolbar from "./SearchToolbar";
import Zoom from "./Zoom";

const Toolbar = ({ documentId }: { documentId: string }) => {
  return (
    <div className="flex h-10 w-full border-b border-gray-300">
      <SearchToolbar documentId={documentId} />
      <Zoom documentId={documentId} />
      <Highlighter documentId={documentId} />
    </div>
  );
};

export default Toolbar;
