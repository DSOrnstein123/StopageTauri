import type { DistributiveOmit } from "@system/shared/utils/distributiveOmit";
import type { OpenTabParams } from "@system/workbench/tab/types/tabParams";

export type TabParams = DistributiveOmit<OpenTabParams, "title">;
