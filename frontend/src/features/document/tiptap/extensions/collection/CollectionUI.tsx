import CollectionView from "./CollectionView";
import type { ReactNodeViewProps } from "@tiptap/react";
import CollectionNodeProvider from "./context/CollectionNodeProvider";

const CollectionUI = (props: ReactNodeViewProps) => {
  return (
    <CollectionNodeProvider props={props}>
      <CollectionView />
    </CollectionNodeProvider>
  );
};

export default CollectionUI;
