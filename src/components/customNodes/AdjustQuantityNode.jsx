import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

function AdjustQuantityNode() {
  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Left} />
      <h3>Adjust Quantity</h3>
      <select>
        <option value="boots">Boots</option>
        <option value="coin">Coin</option>
        <option value="sword">Sword</option>
      </select>

      <label htmlFor="text">By</label>
      <input name="text" className="nodrag" />
      <Handle type="source" position={Position.Right} id="b" />
    </div>
  );
}

export default memo(AdjustQuantityNode);
