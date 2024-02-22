import { useData } from "../../context/DataContext";
import { useCallback, useState } from "react";
import axios from "axios";
import Button from "../Button/Button";
import CardsContainer from "../CardsContainer/CardsContainer";
import GenreBar from "./../GenreBar/GenreBar";
import { BASE_URL } from "../../utils/baseurl";

function Videos() {
  const [searchQuery, setSearchQuery] = useState("");
  const { dispatch, videos } = useData();

  const search = async (e) => {
    e.preventDefault();
    try {
      const res = await axios(`${BASE_URL}videos?search=${searchQuery}`);
      const data = res.data;
      setSearchQuery("");
      dispatch({ type: "GET_VIDEOS", payload: data.data.videos });
    } catch (err) {
      console.log("Something went wrong while fetching vedios : ", err);
    }
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
