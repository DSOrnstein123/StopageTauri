import Icon from "@system/shared/ui/icon/Icon";
import NodeNameInput from "./NodeNameInput";
import { useNodeContext } from "../../../categories/node/core/context/NodeContext";

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
