import { memo } from "react";

import BaseNode from "./BaseNode";
import { Handle } from "@xyflow/react";

const DefaultNode = ({ id, type, noHandle }) => {
  return (
    <>
      {<Handle type="source" position="right" />}
      <BaseNode id={id} type={type} noHandle={noHandle}>
        <p>click on default on the header to change the node</p>
      </BaseNode>
    </>
  );
};

export default memo(DefaultNode);
