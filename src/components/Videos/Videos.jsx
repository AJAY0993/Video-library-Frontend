import GenreBar from "./../GenreBar/GenreBar";
import { useData } from "../../context/DataContext";
import { useState } from "react";
import Button from "../Button/Button";
import axios from "axios";
import { BASE_URL } from "../../utils/baseurl";
import CardsContainer from "../CardsContainer/CardsContainer";

function Videos() {
  const [searchQuery, setSearchQuery] = useState("");
  const { dispatch, videos } = useData();
  const search = async (e) => {
    e.preventDefault();
    const res = await axios(`${BASE_URL}videos?search=${searchQuery}`);
    const data = res.data;
    setSearchQuery("");
    dispatch({ type: "GET_VIDEOS", payload: data.data.videos });
  };

  return (
    <section>
      <VideoSearchForm
        value={searchQuery}
        onSubmit={search}
        onChange={setSearchQuery}
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
        onChange={(e) => onChange((s) => e.target.value)}
      ></input>
      &nbsp;
      <Button className="button--circle" onClick={onSubmit}>
        <img src="Images/icons/search.png" alt="" />
      </Button>
    </form>
  );
}

export default Videos;
