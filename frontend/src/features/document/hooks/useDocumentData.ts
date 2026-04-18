import { useEffect, useMemo, useState } from "react";
import { Editor } from "@tiptap/react";
import debounce from "@/shared/utils/debounce";
import { documentService } from "../services/documentService";
import type { RawProperties } from "../schemas/documentSchema";
import type { ColumnSchema } from "../../collection/components/collection.types";
import { collectionService } from "@/features/collection/services/collectionService";

const useDocumentData = (documentId: string, editor: Editor | null) => {
  const [collectionId, setCollectionId] = useState("");
  const [content, setContent] = useState("");
  const [properties, setProperties] = useState<RawProperties>({});
  const [schema, setSchema] = useState<ColumnSchema[]>([]);

  useEffect(() => {
    let cancel = false;

    const getDocumentDetail = async () => {
      const data = await documentService.getDetail(documentId);
      console.log(data);
      if (cancel) return;

      setCollectionId(data.collectionId);
      setContent(data.content);
      setProperties(data.property);
    };
    getDocumentDetail();

    return () => {
      cancel = true;
    };
  }, [documentId]);

  useEffect(() => {
    let cancel = false;

    if (!collectionId) return;

    const getSchema = async () => {
      const data = await collectionService.get(collectionId);
      if (cancel) return;
      setSchema(data.schema);
    };
    getSchema();

    return () => {
      cancel = true;
    };
  }, [collectionId]);

  const mappedProperties = useMemo(() => {
    if (!schema.length) return [];

    return schema.map((col) => ({
      id: col.id,
      name: col.name,
      type: col.type,
      value: properties[col.id],
    }));
  }, [schema, properties]);

  useEffect(() => {
    if (!editor || !content || editor.isDestroyed) return;

    const currentContent = JSON.stringify(editor.getJSON());
    if (currentContent !== content) {
      setTimeout(() => {
        if (!editor.isDestroyed) {
          queueMicrotask(() => {
            editor.commands.setContent(JSON.parse(content || '""'));
          });
        }
      }, 0);
    }
  }, [editor, content]);

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = debounce<(props: { editor: Editor }) => void>(
      (props) => {
        const content = props.editor.getJSON();
        documentService.updateContent(documentId, JSON.stringify(content));
      },
      500,
    );
    editor.on("update", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor, documentId]);

  return { mappedProperties };
};

export default useDocumentData;
