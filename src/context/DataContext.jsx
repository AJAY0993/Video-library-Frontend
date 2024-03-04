import { createContext, useContext, useEffect, useReducer } from "react"
import { useAuth } from "./AuthContext"
import * as playlistReducer from "./../reducer/playlist"
import * as historyReducer from "./../reducer/history"
import * as watchlaterReducer from "../reducer/watchLater"
import reducer from "../reducer/reducer"
import initialState from "../reducer/initialState"
import fetchData from "../utils/fetchData"

const DataContext = createContext()

const reducerFunc = {
  ...historyReducer,
  ...playlistReducer,
  ...watchlaterReducer
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
      fetchData(
        `users/${user._id}/playlists?playlistName=liked`,
        "SET_LIKED",
        "playlists",
        dispatch
      )
  }, [isAuthenticated])

  useEffect(() => {
    isAuthenticated &&
      fetchData(
        `users/${user._id}/playlists?playlistName=watchLater`,
        "SET_WATCHLATER",
        "playlists",
        dispatch
      )
  }, [isAuthenticated])

  useEffect(() => {
    isAuthenticated && historyReducer.getHistory(undefined, dispatch)
  }, [isAuthenticated])

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
