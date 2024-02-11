import VideoCard from "../VideoCard/VideoCard";
import styles from "./VideosContainer.module.css";
import { useData } from "../../context/DataContext";
import MyLoader from "../MyLoader/MyLoader";
import NothingToSee from "./../NothingToSee/NothingToSee";
import { useParams } from "react-router";
import { useEffect } from "react";

function VideosContainer({ type }) {
  const { id } = useParams();
  const { state, reducerFunc, dispatch } = useData();
  const { isLoading, videos, history, playlistVideos } = state;

  const vids =
    type === "playlist"
      ? [...playlistVideos]
      : type === "history"
      ? [...history]
      : [...videos];
  useEffect(() => {
    if (type === "playlist") {
      reducerFunc.getPlaylistVideos(
        { state, action: { payload: id } },
        dispatch
      );
    }
  }, []);
  return (
    <section className={styles.container}>
      {isLoading ? (
        <MyLoader />
      ) : vids.length < 1 ? (
        <NothingToSee />
      ) : (
        vids.map((vod) => <VideoCard vod={vod} key={vod._id} />)
      )}
    </section>
  );
}

export default VideosContainer;
