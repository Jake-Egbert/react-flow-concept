import { memo, useState } from "react";
import { NodeToolbar } from "@xyflow/react";
import CustomModal from "../modals/Modal";
import BaseNode from "./BaseNode";

const DefaultNode = ({ id, type }) => {
  return (
    <>
      <BaseNode id={id} type={type}>
        <h3>Default</h3>
      </BaseNode>
    </>
  );
};

export default memo(DefaultNode);
