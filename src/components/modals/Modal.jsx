import Modal from "react-modal";
import { useHistory } from "react-router-dom";

export default function CustomModal({ isOpen, onRequestClose, endpoint }) {
  const history = useHistory();

  function handleClick() {
    onRequestClose();
    history.push(endpoint);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal"
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
      <div>Would you like to edit this modal</div>
      <button onClick={onRequestClose}>No</button>
      <button onClick={handleClick}>Yes</button>
    </Modal>
  );
}
