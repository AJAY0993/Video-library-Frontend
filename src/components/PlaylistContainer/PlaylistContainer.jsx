import { useData } from "../../context/DataContext";
import PlaylistCard from "../PlaylistCard/PlaylistCard";
import styles from "./PlaylistContainer.module.css";
function PlaylistContainer() {
  const { state } = useData();
  const { playlists } = state;
  return (
    <section className={styles.container}>
      {playlists.map((playlist) => (
        <PlaylistCard playlist={playlist} key={playlist._id} />
      ))}
    </section>
  );
}

export default PlaylistContainer;
