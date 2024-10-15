import React from "react";
import { NodeResizer, Handle } from "@xyflow/react";

const GroupNode = ({ data, children }) => {
  return (
    <div className="group-node">
      <div className="group-label">{data.label}</div>
      <NodeResizer />
      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />
      {children?.map((childId) => (
        <ReactFlow.Node key={childId} id={childId} parentId={data.id} />
      ))}
    </div>
  );
};

export default GroupNode;
