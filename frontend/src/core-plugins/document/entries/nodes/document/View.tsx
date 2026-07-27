import Detail from "./components/Detail";
import Shell from "./components/Shell";
import type { ViewProps } from "./types";

const View = ({ EditorView }: ViewProps) => {
  return (
    <Shell>
      <Detail EditorView={EditorView} />
    </Shell>
  );
};

export default View;
