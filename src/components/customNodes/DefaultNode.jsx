import { memo } from "react";

import BaseNode from "./BaseNode";
import { Handle } from "@xyflow/react";

const DefaultNode = ({ id, type, oneHandle, noHandle }) => {
  return (
    <>
      {oneHandle && <Handle type="source" position="right" />}
      <BaseNode id={id} type={type} oneHandle={oneHandle} noHandle={noHandle}>
        <h3>Default</h3>
      </BaseNode>
    </>
  );
};

export default memo(DefaultNode);
