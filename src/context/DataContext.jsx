import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { BASE_URL } from "../utils/baseurl";
import myToast from "../utils/customToast";
import { useAuth } from "./AuthContext";

const DataContext = createContext();

const initialState = {
  videos: [],
  playlists: [],
  playlistVideos: [],
  history: [],
  watchLater: [],
  liked: [],
  filter: "all",
  genres: [],
  isLoading: false,
  showModal: false,
  selectedVid: null,
};

async function getVideos({ state, action }, dispatch) {
  try {
    setLoader({ state, action: { payload: true } }, dispatch);
    const configuration = {
      method: "GET",
      url: `${BASE_URL}videos${
        state.filter !== "all" ? "?category=" + state.filter : ""
      }`,
    };
    const res = await axios(configuration);
    const data = res.data;
    const videos = data.data.videos;
    dispatch({ type: "GET_VIDEOS", payload: videos });
  } catch (err) {
    console.log(err);
  } finally {
    setLoader({ state, action: { payload: false } }, dispatch);
  }
}

async function getCategories({ state, action }, dispatch) {
  try {
    setLoader({ state, action: { payload: true } }, dispatch);
    const res = await axios(`${BASE_URL}videos/genres`);
    const data = await res.data.data;
    dispatch({ type: "GET_CATEGORIES", payload: data.genres });
  } catch (err) {
    console.log(err);
  } finally {
    setLoader({ state, action: { payload: false } }, dispatch);
  }
}

function setFilter({ state, action }, dispatch) {
  dispatch({ type: "SET_FILTER", payload: action.payload });
}

function setLoader({ state, action }, dispatch) {
  dispatch({ type: "SET_LOADER", payload: action.payload });
}

async function getHistory({ state, action }, dispatch) {
  try {
    const token = localStorage.getItem("token");
    const configuration = {
      method: "GET",
      url: `${BASE_URL}users/history`,
      headers: {
        Authorization: `BEARER ${token}`,
      },
    };
    const res = await axios(configuration);
    const data = res.data.data;
    dispatch({ type: "GET_HISTORY", payload: data.history.reverse() });
  } catch (err) {
    console.log(err);
  }
}

async function updateHistory({ state, action }, dispatch) {
  setLoader({ state, action: { payload: true } }, dispatch);
  const vidId = action.payload;
  const token = localStorage.getItem("token");
  const configuration = {
    method: "PATCH",
    url: `${BASE_URL}users/history`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { vidId: vidId },
  };
  const res = await axios(configuration);
  const data = res.data.data;
  console.log(data.history);
  dispatch({ type: "UPDATE_HISTORY", payload: data.history });
}

async function clearHistory(_, dispatch) {
  const token = localStorage.getItem("token");
  const configuration = {
    method: "PATCH",
    url: `${BASE_URL}users/history/clear`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios(configuration);
  myToast("success", "History cleared successfully");
  dispatch({ type: "CLEAR_HISTORY", payload: [] });
}

async function removeHistory({ state, action }, dispatch) {
  const token = localStorage.getItem("token");
  const configuration = {
    method: "PATCH",
    url: `${BASE_URL}users/history/remove`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { video: action.payload },
  };
  const res = await axios(configuration);
  myToast("success", "Video removed successfully");
  dispatch({ type: "CLEAR_HISTORY", payload: [] });
}

function openModal({ state, action }, dispatch) {
  dispatch({ type: "OPEN_MODAL", payload: action.payload });
}
function closeModal(_, dispatch) {
  dispatch({ type: "CLOSE_MODAL" });
}

function setSelectedVid({ state, action: { payload: id } }, dispatch) {
  dispatch({ type: "VIDEO_SELECTED", payload: id });
}

async function getPlaylists(_, dispatch) {
  const token = localStorage.getItem("token");
  const configuration = {
    method: "GET",
    url: `${BASE_URL}users/playlists`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios(configuration);
  const data = res.data;
  const playlists = data.data.playlists;
  dispatch({ type: "GET_PLAYLISTS", payload: playlists });
}

function getPlaylistVideos(_, dispatch) {
  const videos = [
    {
      _id: "65bf4cc1e9c8d88b0f3f22c2",
      name: "The Dark Knight",
      category: "action",
      embed: "https://www.youtube.com/embed/EXeTwQWrcwY?si=_9CzQ7L7PMYDKP3z",
      duration: 152,
      description:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      thumb: "https://img.youtube.com/vi/EXeTwQWrcwY/mqdefault.jpg",
      cover: "no image",
      image: "no image",
      views: 2,
      likes: 983.1792405493422,
      dislikes: 60.755221504217346,
      uploadDate: "2024-02-04T08:37:21.001Z",
      __v: 0,
    },
    {
      _id: "65bf4cc1e9c8d88b0f3f22c3",
      name: "Inception",
      category: "action",
      embed: "https://www.youtube.com/embed/YoHD9XEInc0?si=Q3ZYWp8m5nKFOZoA",
      duration: 148,
      description:
        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      thumb: "https://img.youtube.com/vi/YoHD9XEInc0/mqdefault.jpg",
      cover: "no image",
      image: "no image",
      views: 5,
      likes: 983.1792405493422,
      dislikes: 60.755221504217346,
      uploadDate: "2024-02-04T08:37:21.002Z",
      __v: 0,
    },
    {
      _id: "65bf4cc0e9c8d88b0f3f22bd",
      name: "John Wick: Chapter 3 - Parabellum",
      category: "action",
      embed: "https://www.youtube.com/embed/M7XM597XO94?si=fdISu8BgGaGSdPT5",
      duration: 131,
      description:
        "After killing all the enforcers, John is ambushed by Zero and his students; John proceeds to kill all but two. Zero battles John but is eventually defeated and left to die. On the roof of the Continental, The Adjudicator agrees to a parley with Winston, who offers allegiance to the High Table.",
      thumb: "https://img.youtube.com/vi/M7XM597XO94/mqdefault.jpg",
      cover: "no image",
      image: "no image",
      views: 2,
      likes: 983.1792405493422,
      dislikes: 60.755221504217346,
      uploadDate: "2024-02-04T08:37:20.995Z",
      __v: 0,
    },
    {
      _id: "65bf4cc0e9c8d88b0f3f22be",
      name: "Iron Man 3",
      category: "action",
      embed: "https://www.youtube.com/embed/Ke1Y3P9D0Bc?si=H8yOkgxNJLQrEbd8",
      duration: 130,
      description:
        "When Tony Stark's world is torn apart by a formidable terrorist called the Mandarin, he starts an odyssey of rebuilding and retribution.",
      thumb: "https://img.youtube.com/vi/oYSD2VQagc4/mqdefault.jpg",
      cover: "NpTs5gy/wp1886660.jpg",
      image: "ncXK4C7/image1-0.jpg",
      views: 24,
      likes: 189,
      dislikes: 9,
      uploadDate: "2024-02-04T08:37:20.998Z",
      __v: 0,
    },
  ];
  dispatch({ type: "GET_PLAYLIST_VIDEOS", payload: [...videos] });
}

function deletePlaylist(_, dispatch) {}

async function likeVideo({ _, action }, dispatch) {
  const token = localStorage.getItem("token");
  const vidId = action.payload;
  const configuration = {
    methos: "PATCH",
    url: `${BASE_URL}videos/${vidId}/like`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios(configuration);
  const data = res.data.data;
  dispatch({ type: "UPDATE_LIKES", payload: data.likes });
}
const reducerFunc = {
  getVideos,
  getCategories,
  setFilter,
  getHistory,
  updateHistory,
  clearHistory,
  openModal,
  closeModal,
  getPlaylists,
  getPlaylistVideos,
  deletePlaylist,
  likeVideo,
};

function reducer(state, action) {
  switch (action.type) {
    case "GET_VIDEOS":
      return { ...state, videos: action.payload, isLoading: false };
    case "SET_FILTER":
      return { ...state, filter: action.payload.toLowerCase() };
    case "GET_CATEGORIES":
      return { ...state, genres: action.payload, isLoading: false };
    case "SET_LOADER":
      return { ...state, isLoading: action.payload };
    case "GET_HISTORY":
      return { ...state, history: action.payload, isLoading: false };
    case "UPDATE_HISTORY":
      return { ...state, history: action.payload, isLoading: false };
    case "CLEAR_HISTORY":
      return { ...state, history: action.payload };
    case "OPEN_MODAL":
      return { ...state, showModal: true, selectedVid: action.payload };
    case "CLOSE_MODAL":
      return { ...state, showModal: false };
    case "VIDEO_SELECTED":
      return { ...state, selectedVid: action.payload };
    case "GET_PLAYLISTS":
      return { ...state, playlists: action.payload };
    case "GET_PLAYLIST_VIDEOS":
      return { ...state, playlistVideos: action.payload };
    default:
      return { ...state };
  }
}

function DataProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    getVideos({ state, payload: state.filter }, dispatch);
  }, [state.filter]);

  useEffect(() => {
    getCategories({ state, action: null }, dispatch);
  }, []);

  useEffect(() => {
    isAuthenticated && getHistory({ state, action: null }, dispatch);
  }, [isAuthenticated]);

  useEffect(() => {
    isAuthenticated && getPlaylists(null, dispatch);
  }, [isAuthenticated]);

  return (
    <DataContext.Provider value={{ state, reducerFunc, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  return useContext(DataContext);
}

export { DataProvider, useData };
