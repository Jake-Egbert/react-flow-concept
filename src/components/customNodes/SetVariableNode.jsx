import { memo } from "react";

import BaseNode from "./BaseNode";

const SetVariableNode = ({ id }) => {
  return (
    <BaseNode id={id}>
      <label htmlFor="text">Text:</label>
      <input id="text" name="text" className="nodrag" />
      <select>
        <option value="boolean">True/False</option>
        <option value="text">Text</option>
        <option value="number">Number</option>
      </select>
      <input type="text" />
    </BaseNode>
  );
};

export default memo(SetVariableNode);
