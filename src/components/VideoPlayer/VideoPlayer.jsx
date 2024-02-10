import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./VideoPlayer.module.css";
import VideoCard from "../VideoCard/VideoCard";
import timeAgo from "../../utils/timeAgo";
import { copyToClipboard } from "../../utils/copyToClipboard";
import myToast from "../../utils/customToast";
import { BASE_URL } from "../../utils/baseurl";
import axios from "axios";
import Button from "../Button/Button";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import MyLoader from "./../MyLoader/MyLoader";

function VideoPlayer() {
  const { state, reducerFunc, dispatch } = useData();
  const { isAuthenticated } = useAuth();
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [vod, setVod] = useState(null);
  const [show, setShow] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const incrementViews = async () => {
      const configuration = {
        method: "PATCH",
        url: `${BASE_URL}videos/${id}/views`,
      };
      await axios(configuration);
    };
    incrementViews();
  }, [id]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}videos/${id}`);
        const data = await res.json();
        setVod(data.data.video);
        setCurrentCategory(data.data.video.category);
        console.log(vod);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

  useEffect(() => {
    isAuthenticated &&
      reducerFunc.updateHistory({ state, action: { payload: id } }, dispatch);
  }, [id]);

  const shareVideo = () => {
    copyToClipboard(window.location);
    myToast("success", "Link copied successfully");
  };

  if (isLoading) return <MyLoader />;
  if (!vod) return <></>;
  return (
    <div className={styles.container}>
      <div className={styles.videoPlayer}>
        {!isLoading && (
          <iframe
            className={styles.frame}
            src={vod.embed}
            allowFullScreen
          ></iframe>
        )}
        <span className={styles.tag}>#{vod.category}</span>
        <h3>{vod.name}</h3>
        <ul className={styles.funcWrapper}>
          <li>
            <Button className="button--functional">
              <img src="../Images/icons/like.png" alt="like"></img>
              <span> {Math.floor(vod.likes)}</span>
            </Button>
          </li>
          <li>
            <Button className="button--functional" onClick={shareVideo}>
              <img src="../Images/icons/share.png" alt="share"></img>
              <span> Share</span>
            </Button>
          </li>
          <li>
            <Button className="button--functional">
              <img src="../Images/icons/add.png" alt="add"></img>
              <span> Add to</span>
            </Button>
          </li>
        </ul>
        <div className={styles.descriptionBox}>
          {
            <>
              <span>{vod.views} views</span>
              &nbsp; &nbsp;
              <span>{timeAgo(vod.uploadDate)}</span>
              <br></br>
            </>
          }
          {show && <p className={styles.description}>{vod.description}</p>}
          <button className={styles.toggler} onClick={() => setShow((s) => !s)}>
            {show ? "show-less" : "description"}
          </button>
        </div>
      </div>
      <div className={styles.relatedVideosContainer}>
        <div className={styles.relatedVideos}>
          {currentCategory && <Recommendations category={currentCategory} />}
        </div>
      </div>
    </div>
  );
}

function Recommendations({ category }) {
  const [recommendedVideos, setRecommendedVideos] = useState(null);
  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch(
          `http://localhost:3000/api/v1/videos?category=${category}`
        );
        const data = await res.json();
        setRecommendedVideos(data.data.videos);
      } catch (err) {
        console.log(err);
      } finally {
        console.log("done");
      }
    }
    fetchVideos();
  }, [category]);
  return (
    <>
      <h3>Similar videos</h3>
      {recommendedVideos &&
        recommendedVideos.map((vod) => <VideoCard vod={vod} key={vod._id} />)}
    </>
  );
}
export default VideoPlayer;
