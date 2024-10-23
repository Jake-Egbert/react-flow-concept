import { NodeResizer, Handle } from "@xyflow/react";

const GroupNode = () => {
  return (
    <div className="group-node">
      <Handle type="target" position="top" />
      <NodeResizer />
      <input type="text" />
      <Handle type="source" position="bottom" />
    </div>
  );
};

export default GroupNode;
