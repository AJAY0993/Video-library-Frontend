import { useData } from "../../context/DataContext";
import Button from "../Button/Button";
import PlaylistCard from "../PlaylistCard/PlaylistCard";
import styles from "./PlaylistContainer.module.css";
function PlaylistContainer() {
  const { state } = useData();
  const { playlists } = state;
  return (
    <>
      <Button
        className="button--primary"
        onClick={() => alert("Added new Playlist")}
      >
        Create New
      </Button>
      <section className={styles.container}>
        {playlists.map((playlist) => (
          <PlaylistCard playlist={playlist} key={playlist._id} />
        ))}
      </section>
    </>
  );
}

export default PlaylistContainer;
