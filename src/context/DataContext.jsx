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
  selectedPlaylist: null,
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

async function getHistory(_, dispatch) {
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
  dispatch({ type: "UPDATE_HISTORY", payload: data.history.reverse() });
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

async function removeFromHistory({ state, action }, dispatch) {
  setLoader({ state, action: { payload: true } }, dispatch);
  try {
    const token = localStorage.getItem("token");
    const configuration = {
      method: "PATCH",
      url: `${BASE_URL}users/history/remove`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { vidId: action.payload },
    };
    const res = await axios(configuration);
    const data = res.data;
    myToast("success", "Video removed successfully");
    dispatch({ type: "REMOVE_HISTORY", payload: data.data.history.reverse() });
  } catch (err) {
    setLoader({ state, action: { payload: false } }, dispatch);
    console.log(err);
  }
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
  let playlists = data.data.playlists;
  playlists = playlists.filter(
    (playlist) =>
      playlist.name !== "liked" &&
      playlist.name !== "disliked" &&
      playlist.name !== "watchLater"
  );
  console.log(playlists);
  dispatch({ type: "GET_PLAYLISTS", payload: playlists });
}

async function getPlaylistVideos({ state, action }, dispatch) {
  try {
    setLoader({ state, action: { payload: true } }, dispatch);
    const token = localStorage.getItem("token");
    const configuration = {
      method: "GET",
      url: `${BASE_URL}playlists/${action.payload}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios(configuration);
    const data = res.data;
    const playlist = data.data.playlist;
    console.log(playlist.videos);
    dispatch({ type: "GET_PLAYLIST_VIDEOS", payload: playlist.videos });
  } catch (err) {
    console.log(err);
  }
}

async function removeFromPlaylist({ state, action }, dispatch) {
  const endPoint =
    window.location.pathname.replace("playlist", "playlists").slice(1) +
    "/removeVideo";
  try {
    const token = localStorage.getItem("token");
    const configuration = {
      method: "PATCH",
      url: `${BASE_URL}${endPoint}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { vidId: action.payload },
    };
    const res = await axios(configuration);
    const data = res.data;
    myToast("success", data.message);
    console.log("remaing videos", data.data.playlist.videos);
    dispatch({
      type: "REMOVE_PLAYLIST_VIDEOS",
      payload: data.data.playlist.videos,
    });
  } catch (err) {
    setLoader({ state, action: { payload: false } }, dispatch);
    console.log(err);
  }
}

function setSelectedPlaylist({ state, action }, dispatch) {
  console.log(action.payload);
  dispatch({ type: "SET_SELECTED_PLAYLIST", payload: action.payload });
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
  removeFromHistory,
  clearHistory,
  openModal,
  closeModal,
  getPlaylists,
  getPlaylistVideos,
  removeFromPlaylist,
  deletePlaylist,
  likeVideo,
  setSelectedVid,
  setSelectedPlaylist,
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
    case "REMOVE_HISTORY":
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
      return { ...state, playlistVideos: action.payload, isLoading: false };
    case "REMOVE_PLAYLIST_VIDEOS":
      console.log(action.payload);
      return { ...state, playlistVideos: action.payload, isLoading: false };
    default:
      return { ...state };
  }
}

function DataProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { filter } = state;
  useEffect(() => {
    getVideos({ state, payload: state.filter }, dispatch);
  }, [filter]);

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
