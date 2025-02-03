import { memo } from "react";
import BaseNode from "./BaseNode";

const ChallengeNode = ({ id, data, type }) => {
  return (
    <BaseNode id={id} type={type}>
      <div className="node-wrapper">
        <select>
          <option value="boolean">Sheriff Showdown</option>
          <option value="text">Mind Bender</option>
          <option value="number">Order Pictures</option>
        </select>
      </div>
    </BaseNode>
  );
};

export default memo(ChallengeNode);
