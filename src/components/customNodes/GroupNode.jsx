import { NodeResizer } from "@xyflow/react";
import BaseNode from "./BaseNode";

const GroupNode = ({ id, type }) => {
  return (
    <div className="group-node">
      <NodeResizer />
      <BaseNode id={id} type={type} />
      <div className="node-wrapper">
        <input type="text" />
      </div>
    </div>
  );
};

export default GroupNode;
