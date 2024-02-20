import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import throttler from "./../../utils/throttler";
import initialComments from "../../utils/comments";

function VideoPlayer() {
  const { state, reducerFunc, dispatch, liked } = useData();
  const { isAuthenticated, user } = useAuth();
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [vod, setVod] = useState(null);
  const [show, setShow] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(initialComments);
  const { id } = useParams();

  //like video
  const likeFunc = throttler(async () => {
    if (!isAuthenticated) return myToast("error", "Please log in!");
    const token = localStorage.getItem("token");
    const configurations = {
      method: "PATCH",
      url: `${BASE_URL}videos/${id}/like`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios(configurations);
    const data = res.data;
    setLikes((s) => data.data.likes);
    myToast("success", data.message);
  }, 500);

  //increment views
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

  //fetchVideo
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}videos/${id}`);
        const data = await res.json();
        setVod(data.data.video);
        setCurrentCategory(data.data.video.category);
        setLikes((s) => data.data.video.likes);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

  //add video to history
  useEffect(() => {
    isAuthenticated &&
      reducerFunc.addVideoToHistory(
        { state, action: { payload: id } },
        dispatch
      );
  }, [id]);

  //Fetch comments
  useEffect(() => {
    const getComments = async () => {
      const res = await axios(`${BASE_URL}videos/${id}/comments`);
      const data = res.data;
      setComments((s) => data.data.comments);
    };
    getComments();
  }, [id]);

  //share video
  const shareVideo = () => {
    copyToClipboard(window.location);
    myToast("success", "Link copied successfully");
  };

  //comment on video
  const sendComment = async () => {
    try {
      const token = localStorage.getItem("token");
      const configuration = {
        method: "POST",
        url: `${BASE_URL}videos/${id}/comments`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { comment, username: user.username },
      };
      const res = await axios(configuration);
      myToast("success", res.data.message);
      console.log(res.data.data.comment);
      setComments((s) => [...s, res.data.data.comment]);
      setComment("");
    } catch (err) {
      console.log(err);
    }
  };

  const addVideo = () => {
    reducerFunc.setModalType(
      {
        state,
        action: { payload: "addToPlaylist" },
      },
      dispatch
    );
    reducerFunc.setSelectedVideo({ state, action: { payload: id } }, dispatch);
    reducerFunc.openModal(null, dispatch);
  };
  if (isLoading) return <MyLoader />;
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
            <Button className="button--functional" onClick={likeFunc}>
              <img src="/Images/icons/like-fill.png" alt="like"></img>
              <span> {Math.floor(likes)}</span>
            </Button>
          </li>
          <li>
            <Button className="button--functional" onClick={shareVideo}>
              <img src="../Images/icons/share.png" alt="share"></img>
              <span> Share</span>
            </Button>
          </li>
          <li>
            <Button className="button--functional" onClick={addVideo}>
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
        <div className="my-1 d-flex g-1">
          {!isAuthenticated ? (
            <p>
              Please <Link to="/login">Login</Link> to add comments{" "}
            </p>
          ) : (
            <>
              <input
                type="text"
                className="input--secondary fg-1  my-1"
                placeholder="Type here to add comment"
                name="comment"
                value={comment}
                onChange={(e) => setComment((s) => e.target.value)}
              />

              <Button
                className="button--secondary mx-1"
                onClick={() => setComment((s) => "")}
              >
                Cancel
              </Button>
              <Button
                className="button--primary"
                disabled={comment === ""}
                onClick={sendComment}
              >
                Send
              </Button>
            </>
          )}
        </div>

        <div className={styles.commentBox}>
          {comments.length > 0 ? (
            comments.map((comment, i) => (
              <Comment comment={comment} key={i + 1} />
            ))
          ) : (
            <h3>No comments yet</h3>
          )}
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
        const res = await axios(`${BASE_URL}videos?category=${category}`);
        const data = res.data;
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
        recommendedVideos.map((video, i) => (
          <VideoCard video={video} key={i + 1} />
        ))}
    </>
  );
}

function Comment({ comment }) {
  if (!comment) return null;
  return (
    <div className={styles.comment}>
      <figure className="d-flex a-center">
        <img
          className={styles.comment__img}
          src="https://i.ibb.co/mBXRT6g/profile-user.png"
          alt="profile-user"
          border="0"
        ></img>
        <figcaption className={styles.comment__heading}>
          {comment.username || "Unkbown"}
        </figcaption>
      </figure>
      <p className={styles.comment__text}>{comment.comment}</p>
    </div>
  );
}
export default VideoPlayer;
