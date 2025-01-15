import { memo, useState } from "react";
import { NodeToolbar } from "@xyflow/react";
import CustomModal from "../modals/Modal";
import BaseNode from "./BaseNode";

const ChallengeNode = ({ id, data, type }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenModal = () => {
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
        <div className="node-wrapper">
          <NodeToolbar isVisible={data.forceToolbarVisible || undefined}>
            <button onClick={handleOpenModal}>Edit</button>
          </NodeToolbar>

          <select>
            <option value="boolean">Sheriff Showdown</option>
            <option value="text">Mind Bender</option>
            <option value="number">Order Pictures</option>
          </select>
        </div>
      </BaseNode>

      {isEditing && (
        <CustomModal
          isOpen={isEditing}
          onRequestClose={handleCloseModal}
          endpoint={"/challenge-page"}
          key={id}
        />
      )}
    </>
  );
};

export default memo(ChallengeNode);
