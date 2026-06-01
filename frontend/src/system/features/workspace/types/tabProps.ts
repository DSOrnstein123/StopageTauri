export type TabMode = "dynamic" | "static";

interface BaseTabProps {
  icon?: string;
  mode: TabMode;
  isActive: boolean;
  setTitle: (newTitle: string) => void;
}

export interface DynamicTabProps extends BaseTabProps {
  nodeId: string;
  type?: string;
  mode: "dynamic";
}

export interface StaticTabProps extends BaseTabProps {
  type: string;
  mode: "static";
}

export type TabProps = DynamicTabProps | StaticTabProps;
