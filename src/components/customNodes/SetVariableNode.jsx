import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

function SetVariableNode() {
  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Left} />
      <label htmlFor="text">Text:</label>
      <input id="text" name="text" className="nodrag" />
      <select>
        <option value="boolean">True/False</option>
        <option value="text">Text</option>
        <option value="number">Number</option>
      </select>
      <input type="text" />
      <Handle type="source" position={Position.Right} id="b" />
    </div>
  );
}

export default memo(SetVariableNode);
