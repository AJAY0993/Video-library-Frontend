import styles from "./GenreBar.module.css";
import FilterButton from "./../FilterButton/FilterButton";
import { useData } from "../../context/DataContext";

function GenreBar() {
  const { state } = useData();
  const { isLoading, genres } = state;
  return (
    <ul className={styles.filterWrapper}>
      <FilterButton key={"All"} text={"All"} />
      {genres.map((genre) => (
        <FilterButton key={genre.name} text={genre.name} />
      ))}
    </ul>
  );
}

export default GenreBar;
