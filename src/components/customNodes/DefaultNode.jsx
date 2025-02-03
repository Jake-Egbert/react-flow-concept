import { memo } from "react";

import BaseNode from "./BaseNode";
import { Handle } from "@xyflow/react";

const DefaultNode = ({ id, type }) => {
  return (
    <>
      {<Handle type="source" position="right" />}
      <BaseNode id={id} type={type}>
        <p>click on default on the header to change the node</p>
      </BaseNode>
    </>
  );
};

export default memo(DefaultNode);
