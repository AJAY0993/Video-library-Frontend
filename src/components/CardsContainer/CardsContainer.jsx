import { useState } from "react";
import { useData } from "../../context/DataContext";
import VideoCard from "../VideoCard/VideoCard";
import MyLoader from "../MyLoader/MyLoader";
import NothingToSee from "../NothingToSee/NothingToSee";

function CardsContainer({ videos }) {
  const { isLoading } = useData();
  const [openDropDownId, setOpenDropDownId] = useState();

  const toggleDropDownId = (id) => {
    setOpenDropDownId((openDropDownId) => (openDropDownId === id ? null : id));
  };

  return (
    <div className="card__container d-flex wrap j-center g-1">
      {isLoading ? (
        <MyLoader />
      ) : videos.length < 1 ? (
        <NothingToSee />
      ) : (
        videos.map((video, i) => (
          <VideoCard
            video={video}
            key={i + 1}
            openDropDownId={openDropDownId}
            toggleDropDownId={toggleDropDownId}
          />
        ))
      )}
    </div>
  );
}

export default CardsContainer;
