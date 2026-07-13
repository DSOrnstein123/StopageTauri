import type { ReactNode } from "react";
import {
  type DocumentContentContextType,
  DocumentContentContext,
} from "./DocumentContentContext";

const DocumentContentProvider = ({
  value,
  children,
}: {
  value: DocumentContentContextType;
  children: ReactNode;
}) => {
  return (
    <DocumentContentContext.Provider value={value}>
      {children}
    </DocumentContentContext.Provider>
  );
};

export default DocumentContentProvider;
