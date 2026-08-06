import type { DistributiveOmit } from "@system/shared/utils/distributiveOmit";
import type { OpenEntryTabParams } from "@system/workbench/tab/types/tabParams";

export type TabParams = DistributiveOmit<OpenEntryTabParams, "title" | "zone">;
