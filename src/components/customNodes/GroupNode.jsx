import { NodeResizer } from "@xyflow/react";
import BaseNode from "./BaseNode";

const GroupNode = ({ id, type }) => {
  return (
    <div className="group-node">
      <NodeResizer
        handleStyle={{ opacity: 0 }}
        lineStyle={{ opacity: 0 }}
        minWidth={240}
        minHeight={70}
      />
      <BaseNode id={id} type={type} />
      <div className="node-wrapper">
        <input type="text" />
      </div>
    </div>
  );
};

export default GroupNode;
