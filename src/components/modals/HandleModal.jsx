import Modal from "react-modal";
import { useState } from "react";

import "../../styles/modals/modal.css";

export default function HandleModal({
  isOpen,
  onRequestClose,
  handleAdd,
  handleRemove,
}) {
  const [selectedSide, setSelectedSide] = useState("right");

  const handleSideChange = (event) => {
    setSelectedSide(event.target.value);
  };

  const addHandle = () => {
    handleAdd(selectedSide);
  };

  const removeHandle = () => {
    handleRemove(selectedSide);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Manage Handles"
      className={{
        base: "modal-base",
        afterOpen: "modal-base_after-open",
        beforeClose: "modal-base_before-close",
      }}
      overlayClassName={{
        base: "overlay-base",
        afterOpen: "overlay-base_after-open",
        beforeClose: "overlay-base_before-close",
      }}
      shouldCloseOnOverlayClick={true}
    >
      <h3>Manage Handles</h3>
      <div>
        <label>
          <input
            type="radio"
            name="side"
            value="right"
            checked={selectedSide === "right"}
            onChange={handleSideChange}
          />
          Right
        </label>
        <label>
          <input
            type="radio"
            name="side"
            value="left"
            checked={selectedSide === "left"}
            onChange={handleSideChange}
          />
          Left
        </label>
      </div>
      <div>
        <button type="button" onClick={removeHandle}>
          -
        </button>
        <button type="button" onClick={addHandle}>
          +
        </button>
      </div>
      <button type="button" onClick={onRequestClose}>
        Close
      </button>
    </Modal>
  );
}
