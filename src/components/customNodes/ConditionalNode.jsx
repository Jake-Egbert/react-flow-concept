import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

function ConditionalNode() {
  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Bottom} />
      <h3>Conditional</h3>
      <select>
        <option value="boots">spokeToMayor</option>
        <option value="coin">tokenCount</option>
        <option value="sword">yearGussed</option>
      </select>

      <select>
        <option value="boots">equal to</option>
        <option value="coin">not equal to</option>
        <option value="sword">greater than</option>
        <option value="sword">less than</option>
      </select>

      <select>
        <option value="fs">True</option>
        <option value="fs">False</option>
      </select>
      <Handle type="source" position={Position.Right} id="8" />
    </div>
  );
}

export default memo(ConditionalNode);
