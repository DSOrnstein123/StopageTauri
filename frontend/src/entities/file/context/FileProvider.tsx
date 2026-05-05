import type { ReactNode } from "react";
import { FileContext, type IFileContext } from "./FileContext";

const FileProvider = ({
  props,
  children,
}: {
  props: IFileContext;
  children: ReactNode;
}) => {
  return <FileContext.Provider value={props}>{children}</FileContext.Provider>;
};

export default FileProvider;
