import { useData } from "../../context/DataContext";
import styles from "./Modal.module.css";
function Modal() {
  const { state, reducerFunc, dispatch } = useData();
  const onClick = () => {
    reducerFunc.closeModal(null, dispatch);
  };
  return (
    <>
      <div className={styles.modalWrapper}></div>
      <div className={styles.modalContainer}>
        <h3>Save</h3>
        <button className={styles.closeModalBtn} onClick={onClick}>
          <img
            src="https://i.ibb.co/4FbpHMs/close.png"
            alt="close"
            border="0"
          ></img>
        </button>
        <ul>
          <li>WatchLater</li>
          <li>Playlis 1</li>
          <li>Playlist 2</li>
        </ul>
      </div>
    </>
  );
}

export default Modal;
