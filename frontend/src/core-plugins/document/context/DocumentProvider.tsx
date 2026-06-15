import type { ReactNode } from "react";
import { DocumentContext } from "./useDocumentContext";

const DocumentProvider = ({
  value,
  children,
}: {
  value: DocumentContext;
  children: ReactNode;
}) => {
  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};

export default DocumentProvider;
