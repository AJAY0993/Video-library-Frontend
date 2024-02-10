import axios from "axios";
import { useData } from "../../context/DataContext";
import { BASE_URL } from "../../utils/baseurl";
import Button from "../Button/Button";
import styles from "./Modal.module.css";
function Modal({ type }) {
  const { state, reducerFunc, dispatch } = useData();
  const { currentVideoId } = state;
  const playlists = state.playlists.filter(
    (playlist) =>
      playlist.name !== "liked" &&
      playlist.name !== "watchLater" &&
      playlist.name !== "disliked"
  );

  const closeModal = () => {
    reducerFunc.closeModal(null, dispatch);
  };

  const addToPlaylist = async (id) => {
    const token = localStorage.getItem("token");
    const configuration = {
      method: "PATCH",
      url: `${BASE_URL}playlists/${id}/addVideo`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        videoId: currentVideoId,
      },
    };
    const res = await axios(configuration);
  };

  return (
    <>
      <div className={styles.modalWrapper}></div>
      <div className={styles.modalContainer}>
        {true && (
          <>
            <h3>Save</h3>
            <button className={styles.closeModalBtn} onClick={closeModal}>
              <img
                src="https://i.ibb.co/4FbpHMs/close.png"
                alt="close"
                border="0"
              ></img>
            </button>
            <ul>
              {playlists.map((playlist) => (
                <li
                  key={playlist._id}
                  onClick={() => addToPlaylist(playlist._id)}
                >
                  {playlist.name}
                </li>
              ))}
            </ul>
          </>
        )}

        {type === "createPlaylist" && (
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
              <Button
                className="button--submit"
                onClick={() => alert("created")}
              >
                Create
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Modal;
