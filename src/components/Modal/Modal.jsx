import { useData } from "../../context/DataContext";
import styles from "./Modal.module.css";
import { AddToPlaylist, CreatePlaylist } from "../Modals/Modals";
function Modal() {
  const { reducerFunc, dispatch, modalType } = useData();

  const closeModal = () => {
    reducerFunc.closeModal(null, dispatch);
  };

  return (
    <>
      <div className={styles.modalWrapper}></div>
      <div className={styles.modalContainer}>
        <button className={styles.closeModalBtn} onClick={closeModal}>
          <img
            src="https://i.ibb.co/4FbpHMs/close.png"
            alt="close"
            border="0"
          ></img>
        </button>
        {modalType === "addToPlaylist" ? (
          <AddToPlaylist />
        ) : modalType === "createPlaylist" ? (
          <CreatePlaylist />
        ) : null}
      </div>
    </>
  );
}

export default Modal;
