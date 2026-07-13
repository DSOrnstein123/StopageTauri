import Icon from "@system/ui/icon/Icon";
import NodeNameInput from "./NodeNameInput";
import { useNodeContext } from "../context/NodeContext";

const NodeName = () => {
  const data = useNodeContext();

  return (
    <div>
      <Icon data={data.icon} />
      <NodeNameInput />
    </div>
  );
};

export default NodeName;
