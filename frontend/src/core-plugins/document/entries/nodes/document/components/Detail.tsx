import type { ViewProps } from "../types";
import DocumentContent from "./Content";

const Detail = ({ EditorView }: ViewProps) => {
  return <DocumentContent EditorView={EditorView} />;
};

export default Detail;
