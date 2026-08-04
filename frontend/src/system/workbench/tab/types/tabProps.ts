import type { OpenTabParams } from "./tabParams";

export type TabProps = Omit<OpenTabParams, "zone"> & {
  tabId: string;
};
