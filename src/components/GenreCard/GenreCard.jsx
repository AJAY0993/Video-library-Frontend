import { useData } from "../../context/DataContext";
import styles from "./GenreCard.module.css";
import { useNavigate } from "react-router-dom";

function GenreCard({ genre }) {
  const { dispatch } = useData();
  const navigate = useNavigate();
  function onClick() {
    navigate("/explore");
    dispatch({ type: "SET_FILTER", payload: genre.name });
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
