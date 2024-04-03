import { useData } from "../../context/DataContext"
import { AddToPlaylist, CreatePlaylist } from "../Modals/Modals"
import styles from "./Modal.module.css"

function Modal() {
  const { dispatch, modalType } = useData()

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" })
  }

  return (
    <>
      <div className={styles.modalWrapper}></div>
      <div className={styles.modalContainer}>
        <button className={styles.closeModalBtn} onClick={closeModal}>
          <img src="/Images/icons/close.png" alt="close" border="0"></img>
        </button>
        {modalType === "addToPlaylist" ? (
          <AddToPlaylist />
        ) : modalType === "createPlaylist" ? (
          <CreatePlaylist />
        ) : null}
      </div>
    </>
  )
}

export default Modal
