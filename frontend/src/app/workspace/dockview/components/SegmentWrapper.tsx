import { SegmentContent } from "@system/workbench/segment/public";
import type { IDockviewPanelProps } from "dockview-core";

export const SegmentWrapper = (props: IDockviewPanelProps) => {
  const { api } = props;
  const segmentId = api.id;
  const segmentName = api.title;

  if (!segmentName) return null;

  return <SegmentContent id={segmentId} name={segmentName} />;
};
