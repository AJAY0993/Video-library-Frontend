import React from "react";
import { useData } from "../../context/DataContext";
import { copyToClipboard } from "./../../utils/copyToClipboard";
import { useLocation, useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import myToast from "../../utils/customToast";
import styles from "./DropDown.module.css";

function DropDown({ videoId }) {
  const { isAuthenticated, user } = useAuth();
  const { reducerFunc, dispatch } = useData();
  const location = useLocation();
  const { id } = useParams();

  const removeVideo = (videoIdToRemove) => {
    //Remove from playlist
    if (location.pathname.includes("playlists")) {
      reducerFunc.removeVideoFromPlaylist(
        { playlistId: id, videoId: videoIdToRemove },
        dispatch
      );
    }

    //Remove from watchlater
    if (location.pathname.includes("watchlater")) {
      reducerFunc.removeVideoFromWatchLater(
        { videoId, userId: user._id },
        dispatch
      );
    }

    //Remove from history
    if (location.pathname.includes("history")) {
      reducerFunc.removeVideoFromHistory({ videoId: videoId }, dispatch);
    }
  };

  //Share video handler
  const handleShare = () => copyToClipboard(location.pathname);

  //Add to watchlater
  const addVideoToWatchLater = () => {
    if (!isAuthenticated) return myToast("error", "Please log in!");
    reducerFunc.addVideoToWatchLater({ videoId, userId: user._id }, dispatch);
  };

  //Save video to playlist
  const saveToPlaylist = () => {
    if (!isAuthenticated) return myToast("error", "Please log in");
    dispatch({ type: "SET_MODAL_TYPE", payload: "addToPlaylist" });
    dispatch({ type: "VIDEO_SELECTED", payload: videoId });
    dispatch({ type: "OPEN_MODAL" });
  };

  function renderActions() {
    return (
      <div className={styles.dropDown}>
        <ul>
          <Li onClick={handleShare}>
            <img src="https://i.ibb.co/N6W8qVD/share.png" alt="share" />
            <span>Share</span>
          </Li>
          <Li onClick={() => removeVideo(videoId)}>
            <img src="https://i.ibb.co/JqXFGZ5/delete.png" alt="delete" />
            Remove
          </Li>
        </ul>
      </div>
    );
  }

  function renderDefaultActions() {
    return (
      <div className={styles.dropDown}>
        <ul>
          <Li onClick={handleShare}>
            <img src="https://i.ibb.co/N6W8qVD/share.png" alt="share" />
            <span>Share</span>
          </Li>
          <Li onClick={addVideoToWatchLater}>
            <img src="https://i.ibb.co/CwCpHVw/clock.png" alt="clock" />
            <span>Add to watch later</span>
          </Li>
          <Li onClick={saveToPlaylist} className={styles.dropDownItem}>
            <img
              src="https://i.ibb.co/dW6jfY0/add-to-playlist-1.png"
              alt="add-to-playlist-1"
            />
            <span>Save to Playlist</span>
          </Li>
        </ul>
      </div>
    );
  }

  return location.pathname.includes("history") ||
    location.pathname.includes("playlist") ||
    location.pathname.includes("watchlater")
    ? renderActions()
    : renderDefaultActions();
}

function Li({ children, onClick }) {
  return (
    <li className={styles.dropDownItem} onClick={onClick}>
      {children}
    </li>
  );
}
export default DropDown;
