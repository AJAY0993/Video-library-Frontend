import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { BASE_URL } from "../utils/baseurl";
import myToast from "../utils/customToast";
import { useAuth } from "./AuthContext";
import {
  getPlaylists,
  createPlaylist,
  getPlaylistVideos,
  deletePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
} from "../reducer/playlist";
import {
  getHistory,
  addVideoToHistory,
  removeVideoFromHistory,
  clearHistory,
} from "../reducer/history";

import {
  getWatchLater,
  removeVideoFromWatchLater,
  addVideoToWatchLater,
} from "../reducer/watchLater";
import reducer from "../reducer/reducer";
import initialState from "../reducer/initialState";

const DataContext = createContext();

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

function openModal(_, dispatch) {
  dispatch({ type: "OPEN_MODAL" });
}

function closeModal(_, dispatch) {
  dispatch({ type: "CLOSE_MODAL" });
}

function setModalType({ state, action }, dispatch) {
  dispatch({ type: "SET_MODAL_TYPE", payload: action.payload });
}
function setSelectedVideo({ state, action: { payload: id } }, dispatch) {
  dispatch({ type: "VIDEO_SELECTED", payload: id });
}

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
  setLoader,
  getHistory,
  addVideoToHistory,
  removeVideoFromHistory,
  clearHistory,
  openModal,
  closeModal,
  getPlaylists,
  createPlaylist,
  getPlaylistVideos,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  removeVideoFromWatchLater,
  addVideoToWatchLater,
  likeVideo,
  setSelectedVideo,
  setModalType,
};

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
    isAuthenticated && getPlaylists(null, dispatch);
  }, [isAuthenticated]);

  useEffect(() => {
    isAuthenticated && getWatchLater(null, dispatch);
  }, [isAuthenticated]);

  useEffect(() => {
    isAuthenticated && getHistory(null, dispatch);
  }, [isAuthenticated]);

  return (
    <DataContext.Provider value={{ state, reducerFunc, dispatch, ...state }}>
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  return useContext(DataContext);
}

export { DataProvider, useData };
