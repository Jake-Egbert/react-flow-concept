import { memo } from "react";
import BaseNode from "./BaseNode";

function AdjustVariableNode({ id, type }) {
  return (
    <BaseNode id={id} type={type}>
      <div className="adjust-node-wrapper node-wrapper">
        <select>
          <option value="boots">Boots</option>
          <option value="coin">Coin</option>
          <option value="sword">Sword</option>
        </select>

        <div className="buttons-wrapper">
          <label htmlFor="text">By</label>
          <button>+</button>
          <button>-</button>
          <input name="text" className="nodrag" />
        </div>
      </div>
    </BaseNode>
  );
}

export default memo(AdjustVariableNode);
