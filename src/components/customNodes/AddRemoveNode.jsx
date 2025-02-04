import { memo } from "react";

import BaseNode from "./BaseNode";

const AddRemoveNode = ({ id, type, addRemove }) => {
  console.log(type);
  return (
    <BaseNode id={id} type={type}>
      <div className="add-remove-wrapper node-wrapper">
        <div className="top-wrapper">
          <select>
            <option value="boolean">food supply</option>
            <option value="text">Coin</option>
            <option value="number">Arrow</option>
          </select>
        </div>

        <div className="middle-wrapper">
          <p>Amount to {addRemove}</p>
          <input type="number" defaultValue={0} />
        </div>

        <div className="bottom-wrapper">
          <label htmlFor="text">Item Type</label>
          <select>
            <option value="boolean">food supply</option>
            <option value="text">Coin</option>
            <option value="number">Arrow</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};

export default memo(AddRemoveNode);
