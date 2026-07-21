import type { OpenTabParams } from "@system/workbench/workspace/types/tabParams";
import type { DistributiveOmit } from "@system/shared/utils/distributiveOmit";

export type TabParams = DistributiveOmit<OpenTabParams, "title">;
