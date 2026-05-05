import {
  RawDocumentFileSchema,
  type RawDocumentFile,
} from "@features/document/schemas/documentSchema";

export const fileValidation = {
  document: (rawData: unknown): RawDocumentFile =>
    RawDocumentFileSchema.parse(rawData),
};
