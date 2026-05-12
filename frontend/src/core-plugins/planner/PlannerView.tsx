import type { IDockviewPanelProps } from "dockview-core";
import Planner from "./components/Planner";

const PlannerView = (props: IDockviewPanelProps) => {
  return <Planner key={props.api.id} />;
};

export default PlannerView;
