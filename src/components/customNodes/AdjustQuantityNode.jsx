import { memo } from "react";
import BaseNode from "./BaseNode";

function AdjustQuantityNode({ id }) {
  return (
    <BaseNode id={id}>
      <div className="text-updater-node">
        <h3>Adjust Quantity</h3>
        <select>
          <option value="boots">Boots</option>
          <option value="coin">Coin</option>
          <option value="sword">Sword</option>
        </select>

        <label htmlFor="text">By</label>
        <input name="text" className="nodrag" />
      </div>
    </BaseNode>
  );
}

export default memo(AdjustQuantityNode);
