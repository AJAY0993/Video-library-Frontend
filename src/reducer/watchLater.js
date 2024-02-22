import axios from "axios"
import { BASE_URL } from "../utils/baseurl"
import myToast from "../utils/customToast";

export async function getWatchLater({ state, action }, dispatch) {
    const token = localStorage.getItem('token')
    const configuration = {
        method: "GET",
        url: `${BASE_URL}users/${action.payload}/playlists?playlistName=watchLater`,
        headers: { Authorization: `Bearer ${token}` }
    }
    dispatch({ type: "SET_LOADER", payload: true });
    try {
        const res = await axios(configuration)
        const data = res.data
        console.log(data)
        dispatch({ type: "GET_WATCHLATER", payload: data.data.playlists[0].videos })
        dispatch({ type: "SET_LOADER", payload: false });
    } catch (err) {
        console.log(err)
        dispatch({ type: "SET_LOADER", payload: false });
    }

}

export async function addVideoToWatchLater(payload, dispatch) {
    try {
        dispatch({ type: "SET_LOADER", payload: true });
        const token = localStorage.getItem('token')
        const configuration = {
            method: "PATCH",
            url: `${BASE_URL}users/${payload.userId}/playlists/watchLater/videos/${payload.videoId}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                playlistName: "watchLater"
            }
        }
        const res = await axios(configuration)
        const data = res.data
        const watchLater = data.data.playlist.videos
        myToast("success", "Video added successfully")
        dispatch({ type: "ADD_VIDEO_TO_WATCHLATER", payload: watchLater })
        dispatch({ type: "SET_LOADER", payload: false });
    }
    catch (err) {
        console.log(err)
        myToast("error", err.response.data.message)
        dispatch({ type: "SET_LOADER", payload: false });
    }
}

export async function removeVideoFromWatchLater(payload, dispatch) {
    try {
        dispatch({ type: "SET_LOADER", payload: true });
        const token = localStorage.getItem('token')
        const configuration = {
            method: "DELETE",
            url: `${BASE_URL}users/${payload.userId}/playlists/watchLater/videos/${payload.videoId}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                playlistName: "watchLater"
            }
        }
        const res = await axios(configuration)
        const data = res.data
        const watchLater = data.data.playlist.videos
        myToast("success", "Video removed successfully")
        dispatch({ type: "REMOVE_VIDEO_FROM_WATCHLATER", payload: watchLater })
        dispatch({ type: "SET_LOADER", payload: false });
    }
    catch (err) {
        console.log(err)
        myToast("error", err.response.data.message)
        dispatch({ type: "SET_LOADER", payload: false });
    }
}