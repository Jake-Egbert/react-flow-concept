import React from "react";
import { NodeResizer, Handle } from "@xyflow/react";

const GroupNode = ({ data }) => {
  return (
    <div className="group-node">
      <NodeResizer />
      <input type="text" />
      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />
    </div>
  );
};

export default GroupNode;
