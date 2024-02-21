import { useData } from "../../context/DataContext";
import styles from "./DropDown.module.css";
import { copyToClipboard } from "./../../utils/copyToClipboard";
import { useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import myToast from "../../utils/customToast";

function DropDown({ videoId }) {
  const { isAuthenticated } = useAuth();
  const { state, reducerFunc, dispatch, watchLaterId } = useData();
  const { user } = useAuth();
  const location = window.location.pathname;
  const { id } = useParams();
  const remove = () => {
    if (location.includes("history")) {
      reducerFunc.removeVideoFromHistory(
        { state, action: { payload: videoId } },
        dispatch
      );
    }
    if (location.includes("playlist")) {
      reducerFunc.removeVideoFromPlaylist(
        { state, action: { payload: { playlistId: id, videoId: videoId } } },
        dispatch
      );
    }
    if (location.includes("watchlater")) {
      reducerFunc.removeVideoFromWatchLater(
        {
          state,
          action: { payload: { videoId, userId: user._id } },
        },
        dispatch
      );
    }
  };
  const share = () => copyToClipboard(location);

  if (
    location.includes("history") ||
    location.includes("playlist") ||
    location.includes("watchlater")
  ) {
    return (
      <div className={styles.dropDown}>
        <ul>
          <Li onClick={share}>
            <img
              src="https://i.ibb.co/N6W8qVD/share.png"
              alt="share"
              border="0"
            ></img>
            <span>Share</span>
          </Li>
          <Li onClick={remove}>
            <img
              src="https://i.ibb.co/JqXFGZ5/delete.png"
              alt="delete"
              border="0"
            ></img>
            Remove
          </Li>
        </ul>
      </div>
    );
  }
  return (
    <div className={styles.dropDown}>
      <ul>
        <Li onClick={share}>
          <img
            src="https://i.ibb.co/N6W8qVD/share.png"
            alt="share"
            border="0"
          ></img>
          <span>Share</span>
        </Li>
        <Li
          onClick={() => {
            if (!isAuthenticated) return myToast("error", "Please log in!");
            reducerFunc.addVideoToWatchLater(
              { state, action: { payload: { videoId, userId: user._id } } },
              dispatch
            );
          }}
        >
          <img
            src="https://i.ibb.co/CwCpHVw/clock.png"
            alt="clock"
            border="0"
          ></img>
          <span>Add to watch later</span>
        </Li>
        <Li
          onClick={() => {
            dispatch({ type: "SET_MODAL_TYPE", payload: "addToPlaylist" });
            reducerFunc.setSelectedVideo(
              { state, action: { payload: videoId } },
              dispatch
            );
            dispatch({ type: "OPEN_MODAL" });
          }}
          className={styles.dropDownItem}
        >
          <img
            src="https://i.ibb.co/dW6jfY0/add-to-playlist-1.png"
            alt="add-to-playlist-1"
            border="0"
          ></img>
          <span>Save to Playlist</span>
        </Li>
      </ul>
    </div>
  );
}

function Li({ children, onClick }) {
  return (
    <li className={styles.dropDownItem} onClick={onClick}>
      {children}
    </li>
  );
}
export default DropDown;
