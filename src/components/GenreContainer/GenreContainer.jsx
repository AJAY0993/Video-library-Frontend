import styles from "./GenreContainer.module.css"
import GenreCard from "../GenreCard/GenreCard"
import { useData } from "../../context/DataContext"
import MyLoader from "../MyLoader/MyLoader"

function GenreContainer() {
  const { state } = useData()
  const { genres, isLoading } = state
  return (
    <div className={styles.container}>
      {isLoading && <MyLoader />}
      {!isLoading &&
        genres.map((genre) => (
          <GenreCard key={genre.name} genre={genre}></GenreCard>
        ))}
    </div>
  )
}

export default GenreContainer
