import VideoCard from "../VideoCard/VideoCard";
import { useData } from "../../context/DataContext";
import MyLoader from "../MyLoader/MyLoader";
import NothingToSee from "../NothingToSee/NothingToSee";

function CardsContainer({ videos, card }) {
  const { state } = useData();
  const { isLoading } = state;

  return (
    <div className="card__container d-flex wrap j-center g-1">
      {isLoading ? (
        <MyLoader />
      ) : videos.length < 1 ? (
        <NothingToSee />
      ) : (
        videos.map((video, i) => <VideoCard video={video} key={i + 1} />)
      )}
    </div>
  );
}

export default CardsContainer;
