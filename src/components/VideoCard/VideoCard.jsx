import styles from "./VideoCard.module.css";
import { useNavigate } from "react-router";
import timeAgo from "../../utils/timeAgo";
import { useState } from "react";
import DropDown from "../DropDown/DropDown";

function VideoCard({ video }) {
  const [dropDown, setDropDown] = useState(false);
  const toggle = () => setDropDown((s) => !dropDown);

  const navigate = useNavigate();

  const onClick = () => {
    navigate("/explore/" + video._id);
  };
  return (
    <article className={styles.card}>
      <img src={video.thumb} onClick={onClick} className={styles.cardImg}></img>
      <div className={styles.cardContent}>
        <h4 className={styles.title}>{video.name}</h4>
        <ul className={styles.stats}>
          <li>{video.views}&nbsp;views</li>
          <li>{timeAgo(video.uploadDate)}</li>
        </ul>
        <div className={styles.dropDownWrapper}>
          <button className={styles.videoCardFuncBtn} onClick={toggle}>
            {!dropDown && (
              <img
                src="https://i.ibb.co/R3gLpH7/dots.png"
                alt="dots"
                border="0"
              ></img>
            )}
            {dropDown && (
              <img
                src="https://i.ibb.co/4FbpHMs/close.png"
                alt="close"
                border="0"
              ></img>
            )}
          </button>
          {dropDown && <DropDown videoId={video._id} />}
        </div>
      </div>
    </article>
  );
}

export default VideoCard;
