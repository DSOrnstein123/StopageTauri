import { createContext } from "react";

interface CollectionNodeContextType {
  collectionId: string;
}

export const CollectionNodeContext =
  createContext<CollectionNodeContextType | null>(null);
