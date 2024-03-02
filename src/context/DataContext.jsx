import axios from "axios"
import { createContext, useContext, useEffect, useReducer } from "react"
import { BASE_URL } from "./../utils/baseurl"
import { useAuth } from "./AuthContext"
import * as playlistReducer from "./../reducer/playlist"
import * as historyReducer from "./../reducer/history"
import * as watchlaterReducer from "../reducer/watchLater"
import reducer from "../reducer/reducer"
import initialState from "../reducer/initialState"
import fetchData from "../utils/fetchData"

const DataContext = createContext()

async function getLiked({ state, action }, dispatch) {
  dispatch({ type: "SET_LOADER", payload: true })
  const token = localStorage.getItem("token")
  const configuration = {
    method: "GET",
    url: `${BASE_URL}users/${action.payload}/playlists?playlistName=liked`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const res = await axios(configuration)
    const data = res.data
    const liked = data.data.playlists[0].videos
    dispatch({ type: "SET_LIKED", payload: liked })
  } catch (err) {
    console.log(err)
  }
}

function setSelectedVideo({ state, action: { payload: id } }, dispatch) {
  dispatch({ type: "VIDEO_SELECTED", payload: id })
}
const reducerFunc = {
  getLiked,
  ...historyReducer,
  ...playlistReducer,
  ...watchlaterReducer,
  setSelectedVideo
}

function DataProvider({ children }) {
  const { isAuthenticated, user } = useAuth()
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetchData(
      `videos${state.filter !== "all" ? "?category=" + state.filter : ""}`,
      "SET_VIDEOS",
      "videos",
      dispatch
    )
  }, [state.filter])

  useEffect(() => {
    fetchData("videos/genres", "SET_CATEGORIES", "genres", dispatch)
  }, [])

  useEffect(() => {
    isAuthenticated &&
      fetchData(
        `users/${user._id}/playlists`,
        "SET_PLAYLISTS",
        "playlists",
        dispatch
      )
  }, [isAuthenticated])

  useEffect(() => {
    isAuthenticated &&
      getLiked({ state, action: { payload: user._id } }, dispatch)
  }, [isAuthenticated])

  useEffect(() => {
    isAuthenticated &&
      watchlaterReducer.getWatchLater(
        { state, action: { payload: user._id } },
        dispatch
      )
  }, [isAuthenticated])

  useEffect(() => {
    isAuthenticated &&
      historyReducer.getHistory(
        { undefined, action: { payload: user._id } },
        dispatch
      )
  }, [isAuthenticated, user])

  return (
    <DataContext.Provider value={{ state, reducerFunc, dispatch, ...state }}>
      {children}
    </DataContext.Provider>
  )
}

function useData() {
  return useContext(DataContext)
}

export { DataProvider, useData }
