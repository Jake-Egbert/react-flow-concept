import { memo, useState } from "react";
import { NodeToolbar } from "@xyflow/react";
import CustomModal from "../modals/Modal";
import BaseNode from "./BaseNode";

const PresentationNode = ({ id, data, type }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenModal = () => {
    console.log(data);
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  return (
    <>
      <BaseNode id={id} type={type}>
        <NodeToolbar isVisible={data.forceToolbarVisible || undefined}>
          <button onClick={handleOpenModal}>Edit</button>
        </NodeToolbar>

        <select>
          <option value="boolean">Home</option>
          <option value="text">Menu 1</option>
          <option value="number">Introduction</option>
        </select>
      </BaseNode>
      {isEditing && (
        <CustomModal
          isOpen={isEditing}
          onRequestClose={handleCloseModal}
          endpoint={"/presentation-page"}
          key={id}
        />
      )}
    </>
  );
};

export default memo(PresentationNode);
