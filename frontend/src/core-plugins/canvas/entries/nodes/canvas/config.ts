import type { NodeConfig } from "@system/entry/categories/node/core/types";
import { View } from "./View";
import createCanvas from "./createCanvas";
import { definition } from "./definition";

export const config = {
  ...definition,
  view: View,
  actionButtons: [
    {
      id: "open-canvas",
      icon: {
        type: "lucide",
        value: "Workflow",
      },
      action: createCanvas,
    },
  ],
} satisfies NodeConfig;
