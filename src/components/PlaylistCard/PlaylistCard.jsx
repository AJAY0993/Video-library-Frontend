import { useNavigate } from "react-router";
import Button from "../Button/Button";
import styles from "./PlaylistCard.module.css";
import { useData } from "../../context/DataContext";
function PlaylistCard({ playlist }) {
  const { state, reducerFunc, dispatch } = useData();
  const navigate = useNavigate();

  const view = () => {
    navigate(`${playlist._id}`);
  };

  return (
    <article className={styles.card}>
      <img
        src="https://i.ibb.co/CBVgN8S/playlist.jpg"
        alt="playlist"
        border="0"
        onClick={view}
      ></img>
      <div className={styles.card__content}>
        <h4 className={styles.card__title}>{playlist.name}</h4>
        <Button className={"button--play"} onClick={view}>
          <img
            src="https://i.ibb.co/f9r6WyJ/play-button-arrowhead.png"
            alt="play button"
          ></img>
        </Button>
      </div>
    </article>
  );
}

export default PlaylistCard;
