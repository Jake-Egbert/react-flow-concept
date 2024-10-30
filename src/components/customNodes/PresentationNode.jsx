import { memo, useState } from "react";
import { NodeToolbar } from "@xyflow/react";
import Modal from "../modals/Modal";

import BaseNode from "./BaseNode";

const PresentationNode = ({ id, data }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  return (
    <BaseNode id={id}>
      <NodeToolbar isVisible={data.forceToolbarVisible || undefined}>
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </NodeToolbar>
      <select>
        <option value="boolean">Home</option>
        <option value="text">Menu 1</option>
        <option value="number">Introduction</option>
      </select>

      {isEditing && (
        <Modal
          isOpen={isEditing}
          onRequestClose={handleCloseModal}
          endpoint={"/presentation-page"}
          key={id}
        />
      )}
    </BaseNode>
  );
};

export default memo(PresentationNode);
