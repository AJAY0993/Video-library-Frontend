import axios from "axios";
import { useData } from "../../context/DataContext";
import { BASE_URL } from "../../utils/baseurl";
import styles from "./Modal.module.css";
import myToast from "../../utils/customToast";
import { useAuth } from "../../context/AuthContext";
function Modal({ type }) {
  const { isAuthenticated } = useAuth();
  const { state, reducerFunc, dispatch } = useData();
  const { selectedVid } = state;
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
    if (!isAuthenticated) return myToast("error", "Please log in");
    try {
      const token = localStorage.getItem("token");
      const configuration = {
        method: "PATCH",
        url: `${BASE_URL}playlists/${id}/addVideo`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          videoId: selectedVid,
        },
      };
      const res = await axios(configuration);
      const data = res.data;
      myToast("success", data.messsage);
      console.log("success");
      closeModal();
    } catch (err) {
      console.log(err);
    }
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
      </div>
    </>
  );
}

export default Modal;
