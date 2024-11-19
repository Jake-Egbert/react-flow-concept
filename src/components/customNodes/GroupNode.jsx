import { NodeResizer } from "@xyflow/react";
import BaseNode from "./BaseNode";

const GroupNode = ({ id, type }) => {
  return (
    <div className="group-node">
      <NodeResizer />
      <BaseNode id={id} type={type} />
      <input type="text" />
    </div>
  );
};

export default GroupNode;
