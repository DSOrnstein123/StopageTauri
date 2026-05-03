import { createContext, useContext } from "react";

export const FileIdContext = createContext<string | null>(null);

export const useFileIdContext = () => {
  const context = useContext(FileIdContext);
  if (!context) throw new Error("Must be used inside FileIdProvider");
  return context;
};
