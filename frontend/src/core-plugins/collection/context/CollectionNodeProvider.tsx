import { useMemo, type ReactNode } from "react";
import { CollectionNodeContext } from "./collectionNodeContext";
import type { ReactNodeViewProps } from "@system/lib/tiptap";

const CollectionNodeProvider = ({
  props,
  children,
}: {
  props: ReactNodeViewProps;
  children: ReactNode;
}) => {
  const value = useMemo(
    () => ({
      collectionId: props.node.attrs.collectionId,
    }),
    [props.node.attrs.collectionId],
  );

  return (
    <CollectionNodeContext.Provider value={value}>
      {children}
    </CollectionNodeContext.Provider>
  );
};

export default CollectionNodeProvider;
