import { useQueryClient } from "@tanstack/react-query";
import CollectionView from "./CollectionView";
import type { ColumnSchema } from "./collection.types";
import collectionKeys from "@/features/document/hooks/collectionKeys";

const CollectionUI = () => {
  const queryClient = useQueryClient();
  const columnSchema: ColumnSchema[] =
    queryClient.getQueryData(collectionKeys.lists()) || [];

  return <CollectionView columnSchema={columnSchema} />;
};

export default CollectionUI;
