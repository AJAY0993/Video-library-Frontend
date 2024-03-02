import { useState } from "react"
import { useNavigate } from "react-router"
import DropDown from "../DropDown/DropDown"
import styles from "./VideoCard.module.css"
import timeAgo from "../../utils/timeAgo"

function VideoCard({ video, openDropDownId, toggleDropDownId }) {
  const isDropDown = video._id === openDropDownId

  const navigate = useNavigate()

  const toggleDropDown = () => toggleDropDownId(video._id)

  const handleCardClick = () => {
    navigate("/explore/" + video._id)
  }

  return (
    <article className={styles.card}>
      <img
        src={video.thumb}
        onClick={handleCardClick}
        className={styles.cardImg}
        alt={video.name}
      ></img>
      <div className={styles.cardContent}>
        <h4 className={styles.title}>{video.name}</h4>
        <ul className={styles.stats}>
          <li>{video.views}&nbsp;views</li>
          <li>{timeAgo(video.uploadDate)}</li>
        </ul>
        <div className={styles.dropDownWrapper}>
          <button className={styles.videoCardFuncBtn} onClick={toggleDropDown}>
            <img
              src={
                isDropDown
                  ? "/Images/icons/close.png"
                  : "/Images/icons/dots.png"
              }
              alt={isDropDown ? "close" : "open"}
            />
          </button>
          {isDropDown && <DropDown videoId={video._id} />}
        </div>
      </div>
    </article>
  )
}

export default VideoCard
