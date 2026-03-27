import { z } from "zod";

const RawDeckSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "Name cannot be empty"),
  parentId: z.uuid().nullable(),
});

type RawDeck = z.infer<typeof RawDeckSchema>;

const RawPaginatedResponseSchema = z.object({
  decks: z.array(RawDeckSchema),
  totalCounts: z.number().int().nonnegative(),
  totalPages: z.number().int().positive(),
  currentPage: z.number().int().positive(),
  limit: z.number().int().positive(),
});

type RawPaginatedResponse = z.infer<typeof RawPaginatedResponseSchema>;

const ProcessedPaginatedResponseSchema = z.object({
  // decks: z.array(ProcessedDeckSchema),
  totalCounts: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  limit: z.number(),
});

type ProcessedPaginatedResponse = z.infer<
  typeof ProcessedPaginatedResponseSchema
>;

const ApiErrorSchema = z.object({
  error: z.string(),
});

export {
  RawDeckSchema,
  type RawDeck,
  RawPaginatedResponseSchema,
  type RawPaginatedResponse,
  ProcessedPaginatedResponseSchema,
  type ProcessedPaginatedResponse,
  ApiErrorSchema,
};
