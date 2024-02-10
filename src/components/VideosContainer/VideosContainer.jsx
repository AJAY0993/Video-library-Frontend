import VideoCard from "../VideoCard/VideoCard";
import styles from "./VideosContainer.module.css";
import { useData } from "../../context/DataContext";
import MyLoader from "../MyLoader/MyLoader";

function VideosContainer({ type }) {
  const { state } = useData();
  const { isLoading, videos, history, playlistVideos } = state;
  const vids =
    type === "playlist"
      ? [...playlistVideos]
      : type === "history"
      ? [...history]
      : [...videos];
  return (
    <section className={styles.container}>
      {isLoading ? (
        <MyLoader />
      ) : (
        vids.map((vod) => <VideoCard vod={vod} key={vod._id} />)
      )}
    </section>
  );
}

export default VideosContainer;
