import type { JsonObject } from "@system/types/json";
import z from "zod";

export const SerializedDockviewSchema = z.object({
  grid: z.unknown(),
  panels: z.record(z.string(), z.unknown()),
});
export type SerializedDockview = z.infer<typeof SerializedDockviewSchema>;

export const serializeDockviewLayout = (
  value: SerializedDockview,
): JsonObject => {
  return SerializedDockviewSchema.parse(value) as JsonObject;
};
