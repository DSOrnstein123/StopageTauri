import type { OpenTabParams } from "@system/features/workspace/types/tabParams";
import type { DistributiveOmit } from "@system/utils/distributiveOmit";

export type DockviewTabParams = DistributiveOmit<OpenTabParams, "title">;
