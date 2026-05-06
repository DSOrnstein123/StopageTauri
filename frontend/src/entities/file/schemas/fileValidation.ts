import {
  DocumentFileSchema,
  type DocumentFile,
} from "@features/document/schemas/documentSchema";

export const fileValidation = {
  document: (rawData: unknown): DocumentFile =>
    DocumentFileSchema.parse(rawData),
};
