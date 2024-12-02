import { memo } from "react";
import BaseNode from "./BaseNode";

const ConditionalNode = ({ id, type }) => {
  return (
    <BaseNode id={id} type={type}>
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
    </BaseNode>
  );
};

export default memo(ConditionalNode);
