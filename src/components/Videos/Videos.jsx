import GenreBar from "./../GenreBar/GenreBar";
import VideosContainer from "../VideosContainer/VideosContainer";
import { useData } from "../../context/DataContext";
import { useState } from "react";
import Button from "../Button/Button";
import axios from "axios";
import { BASE_URL } from "../../utils/baseurl";

function Videos() {
  const [searchQuery, setSearchQuery] = useState("");
  const { state, dispatch } = useData();
  const search = async (e) => {
    e.preventDefault();
    const res = await axios(`${BASE_URL}videos?search=${searchQuery}`);
    console.log(res);
    const data = res.data;
    setSearchQuery("");
    dispatch({ type: "GET_VIDEOS", payload: data.data.videos });
  };
  <form className="d-flex j-center g-1" onSubmit={search}>
    <input
      placeholder="Type here to search"
      onChange={(e) => setSearchQuery((s) => e.target.value)}
    ></input>{" "}
    &nbsp;
    <Button className="button--circle" onClick={search}>
      <img src="Images/icons/search.png" alt="" />
    </Button>
  </form>;
  return (
    <section>
      <form onSubmit={search} className="d-flex j-center g-1 p-1">
        <input
          className="input--secondary"
          placeholder="Type here to search"
          onChange={(e) => setSearchQuery((s) => e.target.value)}
        ></input>{" "}
        &nbsp;
        <Button className="button--circle" onClick={search}>
          <img src="../public/Images/icons/search.png" alt="" />
        </Button>
      </form>
      <GenreBar />
      <VideosContainer videos={state.videos} />
    </section>
  );
}

export default Videos;
