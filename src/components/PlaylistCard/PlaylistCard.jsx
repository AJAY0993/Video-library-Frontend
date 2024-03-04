import { useNavigate } from "react-router"
import Button from "../Button/Button"
import styles from "./PlaylistCard.module.css"
import { useData } from "../../context/DataContext"
import { useAuth } from "../../context/AuthContext"

function PlaylistCard({ playlist }) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { state, reducerFunc, dispatch } = useData()
  const view = () => {
    navigate(`${playlist._id}`)
  }

  const deletePlaylist = () => {
    reducerFunc.deletePlaylist(
      {
        state,
        action: { payload: { playlistId: playlist._id, userId: user._id } }
      },
      dispatch
    )
  }

  return (
    <article className={styles.card}>
      <img
        src="https://i.ibb.co/CBVgN8S/playlist.jpg"
        alt="playlist"
        border="0"
        onClick={view}
      ></img>
      <div className={styles.card__content + " d-flex j-center"}>
        <h4 className={styles.card__title}>{playlist.name}</h4>
        <Button className={"button--circle mx-1"} onClick={deletePlaylist}>
          <img
            src="https://i.ibb.co/JqXFGZ5/delete.png"
            alt="delete"
            border="0"
          ></img>
        </Button>
        <Button className={"button--circle mx-1"} onClick={view}>
          <img
            src="https://i.ibb.co/f9r6WyJ/play-button-arrowhead.png"
            alt="play button"
          ></img>
        </Button>
      </div>
    </article>
  )
}

export default PlaylistCard
