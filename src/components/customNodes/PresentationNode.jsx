import { memo } from "react";
import BaseNode from "./BaseNode";

const PresentationNode = ({ id, data, type }) => {
  return (
    <BaseNode id={id} type={type}>
      <div className="presentation-wrapper node-wrapper">
        <select>
          <option value="boolean">Home</option>
          <option value="text">Menu 1</option>
          <option value="number">Introduction</option>
        </select>
      </div>
    </BaseNode>
  );
};

export default memo(PresentationNode);
