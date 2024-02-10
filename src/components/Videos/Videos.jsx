import GenreBar from "./../GenreBar/GenreBar";
import VideosContainer from "../VideosContainer/VideosContainer";
import { useData } from "../../context/DataContext";

function Videos() {
  const { state } = useData();
  return (
    <section>
      <GenreBar />
      <VideosContainer videos={state.videos} />
    </section>
  );
}

export default Videos;
