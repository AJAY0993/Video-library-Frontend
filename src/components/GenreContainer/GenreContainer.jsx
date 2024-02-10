import styles from "./GenreContainer.module.css";
import GenreCard from "../GenreCard/GenreCard";
import { FadeLoader } from "react-spinners";
import { useData } from "../../context/DataContext";

function GenreContainer() {
  const { state } = useData();
  const { genres, isLoading } = state;
  return (
    <div className={styles.container}>
      {isLoading && (
        <FadeLoader
          color={"red"}
          loading={isLoading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
          className={styles.loader}
        />
      )}
      {!isLoading &&
        genres.map((genre) => (
          <GenreCard key={genre} genre={genre}></GenreCard>
        ))}
    </div>
  );
}

export default GenreContainer;
