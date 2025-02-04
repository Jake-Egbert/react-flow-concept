import Modal from "react-modal";
import { useState } from "react";

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
        base: "modal-base handle-modal",
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
      <button className="close-button" onClick={onRequestClose}>
        X
      </button>
      <h3>Manage Handles</h3>
      <div className="input-wrapper">
        <label htmlFor="right">Right:</label>
        <input
          type="radio"
          name="side"
          value="right"
          id="right"
          checked={selectedSide === "right"}
          onChange={handleSideChange}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="left">Left: </label>
        <input
          type="radio"
          name="side"
          value="left"
          id="left"
          checked={selectedSide === "left"}
          onChange={handleSideChange}
        />
      </div>
      <div className="button-wrapper">
        <button type="button" onClick={removeHandle}>
          -
        </button>
        <button type="button" onClick={addHandle}>
          +
        </button>
      </div>
    </Modal>
  );
}
