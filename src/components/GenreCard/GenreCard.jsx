import { useData } from "../../context/DataContext";
import styles from "./GenreCard.module.css";
import { useNavigate } from "react-router-dom";

function GenreCard({ genre }) {
  const { state, reducerFunc, dispatch } = useData();
  const { setFilter } = reducerFunc;
  const navigate = useNavigate();
  function onClick() {
    navigate("/explore");
    setFilter({ state, action: { payload: genre.toLowerCase() } }, dispatch);
  }
  return (
    <article
      className={styles.card + " " + genre.toLowerCase()}
      onClick={onClick}
    >
      <h3 className={styles.cardTitle}>{genre}</h3>
    </article>
  );
}

export default GenreCard;
