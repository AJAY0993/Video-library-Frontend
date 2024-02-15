import { useData } from "../../context/DataContext";
import styles from "./Modal.module.css";
import Button from "../Button/Button";
import { useState } from "react";
function Modal() {
  const { state, reducerFunc, dispatch, modalType, selectedVideo } = useData();
  const [name, setName] = useState("");
  const playlists = state.playlists.filter(
    (playlist) =>
      playlist.name !== "liked" &&
      playlist.name !== "watchLater" &&
      playlist.name !== "disliked"
  );

  const addVideoToPlaylist = (id) => {
    reducerFunc.addVideoToPlaylist(
      {
        state,
        action: { payload: { playlistId: id, videoId: selectedVideo } },
      },
      dispatch
    );
  };

  const closeModal = () => {
    reducerFunc.closeModal(null, dispatch);
  };

  return (
    <>
      <div className={styles.modalWrapper}></div>
      <div className={styles.modalContainer}>
        <button className={styles.closeModalBtn} onClick={closeModal}>
          {" "}
          <img
            src="https://i.ibb.co/4FbpHMs/close.png"
            alt="close"
            border="0"
          ></img>
        </button>
        {modalType === "addToPlaylist" ? (
          <>
            <h3>Save</h3>

            <ul>
              {playlists.map((playlist) => (
                <li
                  key={playlist._id}
                  onClick={() => addVideoToPlaylist(playlist._id)}
                >
                  {playlist.name}
                </li>
              ))}
            </ul>
          </>
        ) : modalType === "createPlaylist" ? (
          <>
            <h3>Create new Playlist</h3>
            <div>
              <label htmlFor="">Name :</label>
              <input
                value={name}
                type="text"
                name="playlistName"
                id="playlistName"
                className="input--secondary"
                placeholder="Type here playlist name"
                onChange={(e) => setName((s) => e.target.value)}
              />
              <Button
                className="button--submit"
                onClick={() =>
                  reducerFunc.createPlaylist(
                    {
                      state,
                      action: { payload: { name: name } },
                    },
                    dispatch
                  )
                }
              >
                Create
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default Modal;
