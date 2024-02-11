import styles from "./AddToPlaylist.module.css";
import { useData } from "../../context/DataContext";

function AddToPlaylist() {
  const { state } = useData();
  const { playlists } = state;
  return (
    <div className={styles.container}>
      <button className={styles.closeBtn}>
        <img
          src="https://i.ibb.co/4FbpHMs/close.png"
          alt="close"
          border="0"
        ></img>
      </button>
      <ul>
        {/* {user.playlists.length > 0 &&
          user.playlists.map((playlist) => <li key={2}>Playlist</li>)} */}
        <li>Playlist</li>
        <li>Playlist</li>
        <li>Playlist</li>
        <li>Playlist</li>
      </ul>
      <button>Create new</button>
    </div>
  );
}

export default AddToPlaylist;
