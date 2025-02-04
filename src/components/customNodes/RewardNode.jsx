import { memo } from "react";
import BaseNode from "./BaseNode";

const RewardNode = ({ id, type }) => {
  return (
    <BaseNode id={id} type={type}>
      <div className="node-wrapper">
        <select>
          <option value="boolean">wendy's frosty</option>
          <option value="text">5 dollars off</option>
        </select>
      </div>
    </BaseNode>
  );
};

export default memo(RewardNode);
