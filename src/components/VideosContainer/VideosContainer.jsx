import VideoCard from "../VideoCard/VideoCard";
import styles from "./VideosContainer.module.css";
import { FadeLoader } from "react-spinners";
import { useData } from "../../context/DataContext";

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
        <FadeLoader
          color={"red"}
          loading={isLoading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        vids.map((vod) => <VideoCard vod={vod} key={vod._id} />)
      )}
    </section>
  );
}

export default VideosContainer;
