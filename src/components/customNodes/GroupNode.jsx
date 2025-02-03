import { NodeResizer } from "@xyflow/react";
import BaseNode from "./BaseNode";

const GroupNode = ({ id, type }) => {
  return (
    <div className="group-node">
      <NodeResizer keepAspectRatio={true} minWidth={240} minHeight={70} />
      <BaseNode id={id} type={type} />
      <div className="node-wrapper">
        <input type="text" />
      </div>
    </div>
  );
};

export default GroupNode;
