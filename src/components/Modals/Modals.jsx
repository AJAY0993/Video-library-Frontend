import { useParams } from "react-router"
import { useState } from "react"
import { useData } from "../../context/DataContext"
import { useAuth } from "../../context/AuthContext"
import Button from "../Button/Button"
import styles from "./Modals.module.css"

export function AddToPlaylist() {
  const { user } = useAuth()
  const { id: videoId } = useParams()
  const { reducerFunc, dispatch, playlists, selectedVideo } = useData()
  const myPlaylists = playlists.filter(
    (playlist) =>
      playlist.name !== "liked" &&
      playlist.name !== "watchLater" &&
      playlist.name !== "disliked"
  )

  const addVideoToPlaylist = (id) => {
    reducerFunc.addVideoToPlaylist(
      { playlistId: id, videoId: videoId || selectedVideo, userId: user._id },
      dispatch
    )
  }

  const openCreatePlaylist = () => {
    dispatch({ type: "SET_MODAL_TYPE", payload: "createPlaylist" })
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.modalTitle}>Add to Playlist</h3>
      <ul className="px-1">
        {myPlaylists.map((playlist, i) => {
          return (
            <li key={i + 1} onClick={() => addVideoToPlaylist(playlist._id)}>
              {playlist.name}
            </li>
          )
        })}
      </ul>

      <Button className="button--primary m-auto" onClick={openCreatePlaylist}>
        Create New
      </Button>
    </div>
  )
}

export function CreatePlaylist() {
  const [playlistName, setPlaylistName] = useState()
  const { reducerFunc, dispatch } = useData()
  const { user } = useAuth()
  const createPlaylist = () =>
    reducerFunc.createPlaylist(
      { name: playlistName, userId: user._id },
      dispatch
    )

  return (
    <div className={styles.container}>
      <h3 className={styles.modalTitle}>Create new Playlist</h3>
      <div className="px-1">
        <label htmlFor="">Name :</label>
        <input
          value={playlistName}
          type="text"
          name="playlistName"
          id="playlistName"
          className="input--secondary"
          placeholder="Type here playlist name"
          onChange={(e) => setPlaylistName((s) => e.target.value)}
        />
        <Button className="button--submit" onClick={createPlaylist}>
          Create
        </Button>
      </div>
    </div>
  )
}
