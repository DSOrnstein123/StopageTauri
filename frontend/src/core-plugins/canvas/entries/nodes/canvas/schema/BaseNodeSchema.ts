import z from "zod";

export const PositionSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export const SizeSchema = z.object({
  width: z.number().positive(),
  height: z.number().positive(),
});

export const BaseNodeSchema = z.object({
  id: z.string(),
  position: PositionSchema,
  size: SizeSchema,
});
