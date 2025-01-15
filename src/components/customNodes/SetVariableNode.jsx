import { memo } from "react";

import BaseNode from "./BaseNode";

const SetVariableNode = ({ id, type }) => {
  return (
    <BaseNode id={id} type={type}>
      <div className="set-variable-wrapper node-wrapper">
        <div className="top-wrapper">
          <label htmlFor="text">Text:</label>
          <input id="text" name="text" className="nodrag" />
        </div>

        <div className="bottom-wrapper">
          <select>
            <option value="boolean">True/False</option>
            <option value="text">Text</option>
            <option value="number">Number</option>
          </select>
          <p>to</p>
          <input type="text" />
        </div>
      </div>
    </BaseNode>
  );
};

export default memo(SetVariableNode);
