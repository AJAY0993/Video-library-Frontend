import { useData } from "../../context/DataContext";
import styles from "./GenreCard.module.css";
import { useNavigate } from "react-router-dom";

function GenreCard({ genre }) {
  const { state, reducerFunc, dispatch } = useData();
  const { setFilter } = reducerFunc;
  const navigate = useNavigate();
  function onClick() {
    navigate("/explore");
    setFilter({ state, action: { payload: genre.name } }, dispatch);
  }
  return (
    <article
      className={styles.card}
      onClick={onClick}
      style={{ backgroundImage: `url(https://i.ibb.co/${genre.image})` }}
    >
      <h3 className={styles.cardTitle}>{genre.name}</h3>
    </article>
  );
}

export default GenreCard;
