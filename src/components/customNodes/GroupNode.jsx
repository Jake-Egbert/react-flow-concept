import { useEffect, useCallback } from "react";
import { NodeResizer } from "@xyflow/react";

const GroupNode = ({ data }) => {
  return (
    <div className="group-node">
      <h3>{data.label}</h3>
      <NodeResizer color="#ff0071" minWidth={200} minHeight={50} />
      <div className="group-drag-handle" draggable>
        Drag nodes here
      </div>
    </div>
  );
};

export default GroupNode;
