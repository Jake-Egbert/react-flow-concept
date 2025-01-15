import { memo } from "react";
import BaseNode from "./BaseNode";

const ConditionalNode = ({ id, type }) => {
  return (
    <BaseNode id={id} type={type}>
      <div className="conditional-wrapper node-wrapper">
        <div className="top-wrapper">
          <p>If</p>
          <select>
            <option value="boots">spokeToMayor</option>
            <option value="coin">tokenCount</option>
            <option value="sword">yearGussed</option>
          </select>
        </div>

        <div className="bottom-wrapper">
          <p>is</p>
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
        </div>
      </div>
    </BaseNode>
  );
};

export default memo(ConditionalNode);
