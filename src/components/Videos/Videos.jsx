import { useState } from "react";
import { useData } from "../../context/DataContext";
import Button from "../Button/Button";
import CardsContainer from "../CardsContainer/CardsContainer";
import GenreBar from "./../GenreBar/GenreBar";
import fetchData from "../../utils/fetchData";

function Videos() {
  const [searchQuery, setSearchQuery] = useState("");
  const { dispatch, videos } = useData();

  const search = async (e) => {
    e.preventDefault();
    await fetchData(
      `videos?search=${searchQuery}`,
      "SET_VIDEOS",
      "videos",
      dispatch
    );
    setSearchQuery("");
  };

  const handleInputchange = (e) => setSearchQuery(e.target.value);

  return (
    <section>
      <VideoSearchForm
        value={searchQuery}
        onSubmit={search}
        onChange={handleInputchange}
      />
      <GenreBar />
      <CardsContainer videos={videos} />
    </section>
  );
}

function VideoSearchForm({ value, onSubmit, onChange }) {
  return (
    <form className="d-flex j-center g-1" onSubmit={onSubmit}>
      <input
        className="input--secondary"
        value={value}
        placeholder="Type here to search"
        onChange={onChange}
      />
      &nbsp;
      <Button className="button--circle" onClick={onSubmit}>
        <img src="Images/icons/search.png" alt="" />
      </Button>
    </form>
  );
}

export default Videos;
