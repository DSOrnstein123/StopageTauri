import { ImportedNodeList } from "./components/ImportedNodeList";
import { Toolbar } from "./components/Toolbar";

export const View = () => {
  return (
    <div className="flex flex-col">
      <Toolbar />

      <ImportedNodeList />
    </div>
  );
};
