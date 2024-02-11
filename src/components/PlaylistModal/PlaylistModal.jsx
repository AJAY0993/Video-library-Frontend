import { useData } from "../../context/DataContext";
import Button from "../Button/Button";
import styles from "./PlaylistModal.module.css";

function PlaylistModal() {
  const { state, reducerFunc, dispatch } = useData();

  const closeModal = () => {
    reducerFunc.closeModal(null, dispatch);
  };

  return (
    <div>
      <>
        <h3>Create new Playlist</h3>
        <button className={styles.closeModalBtn} onClick={closeModal}>
          <img
            src="https://i.ibb.co/4FbpHMs/close.png"
            alt="close"
            border="0"
          ></img>
        </button>
        <div>
          <label htmlFor="">Name :</label>
          <input
            type="text"
            name="playlistName"
            id="playlistName"
            className="input--secondary"
          />
          <Button className="button--submit" onClick={() => alert("created")}>
            Create
          </Button>
        </div>
      </>
    </div>
  );
}

export default PlaylistModal;
