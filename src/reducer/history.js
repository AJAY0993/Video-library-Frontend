import axios from "axios"
import { BASE_URL } from "../utils/baseurl"
import myToast from "../utils/customToast"

export async function getHistory(_, dispatch) {
  try {
    dispatch({ type: "SET_LOADER", payload: true })
    const token = localStorage.getItem("token")
    const configuration = {
      method: "GET",
      url: `${BASE_URL}users/history`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const res = await axios(configuration)
    const data = res.data.data
    dispatch({ type: "SET_HISTORY", payload: data.history.reverse() })
    dispatch({ type: "SET_LOADER", payload: false })
  } catch (err) {
    console.log(err)
  }
}

export async function addVideoToHistory(payload, dispatch) {
  dispatch({ type: "SET_LOADER", payload: true })
  const videoId = payload.videoId
  const token = localStorage.getItem("token")
  const configuration = {
    method: "PATCH",
    url: `${BASE_URL}users/history`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: { videoId: videoId }
  }
  const res = await axios(configuration)
  const data = res.data.data
  dispatch({ type: "ADD_VIDEO_TO_HISTORY", payload: data.history.reverse() })
  dispatch({ type: "SET_LOADER", payload: false })
}

export async function clearHistory(_, dispatch) {
  dispatch({ type: "SET_LOADER", payload: true })
  const token = localStorage.getItem("token")
  const configuration = {
    method: "PATCH",
    url: `${BASE_URL}users/history/clear`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  await axios(configuration)
  myToast("success", "History cleared successfully")
  dispatch({ type: "CLEAR_HISTORY", payload: [] })
  dispatch({ type: "SET_LOADER", payload: false })
}

export async function removeVideoFromHistory(payload, dispatch) {
  dispatch({ type: "SET_LOADER", payload: true })
  try {
    const token = localStorage.getItem("token")
    const configuration = {
      method: "PATCH",
      url: `${BASE_URL}users/history/remove`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { videoId: payload.videoId }
    }
    const res = await axios(configuration)
    const data = res.data
    console.log(data)
    myToast("success", "Video removed successfully")
    dispatch({
      type: "REMOVE_VIDEO_FROM_HISTORY",
      payload: data.data.history.reverse()
    })
    dispatch({ type: "SET_LOADER", payload: false })
  } catch (err) {
    dispatch({ type: "SET_LOADER", payload: false })
    console.log(err)
  }
}
