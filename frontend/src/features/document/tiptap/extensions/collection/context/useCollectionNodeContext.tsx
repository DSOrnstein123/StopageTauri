import { useContext } from "react";
import { CollectionNodeContext } from "./CollectionNodeContext";

export const useCollectionNode = () => {
  const context = useContext(CollectionNodeContext);
  if (!context)
    throw new Error("Must use useMyPanel inside CollectionNodeProvider");
  return context;
};
