import styles from "./GenreBar.module.css";
import FilterButton from "./../FilterButton/FilterButton";

function GenreBar() {
  return (
    <ul className={styles.filterWrapper}>
      <FilterButton text={"all"} key={1} />
      <FilterButton text={"horror"} key={2} />
      <FilterButton text={"animation"} key={3} />
      <FilterButton text={"drama"} key={4} />
      <FilterButton text={"action"} key={5} />
      <FilterButton text={"fantasy"} key={6} />
      <FilterButton text={"comedy"} key={7} />
      <FilterButton text={"romance"} key={8} />
      <FilterButton text={"science-fiction"} key={9} />
    </ul>
  );
}

export default GenreBar;
