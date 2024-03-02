import axios from "axios";
import { BASE_URL } from "../utils/baseurl";
import myToast from "../utils/customToast";


export async function getPlaylists({ state, action }, dispatch) {
    const token = localStorage.getItem("token");
    const configuration = {
        method: "GET",
        url: `${BASE_URL}users/${action.payload}/playlists`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    dispatch({ type: "SET_LOADER", payload: true });
    const res = await axios(configuration);
    const data = res.data;
    let playlists = data.data.playlists;
    playlists = playlists.filter(
        (playlist) =>
            playlist.name !== "liked" &&
            playlist.name !== "disliked" &&
            playlist.name !== "watchLater"
    );

    dispatch({ type: "SET_PLAYLISTS", payload: playlists });
    dispatch({ type: "SET_LOADER", payload: false });
}

export async function createPlaylist({ state, action }, dispatch) {
    dispatch({ type: "SET_LOADER", payload: true });
    const token = localStorage.getItem("token");
    const configuration = {
        method: "POST",
        data: {
            name: action.payload.name,
            videos: action.payload.videos || [],
        },
        url: `${BASE_URL}users/${action.payload.userId}/playlists`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const res = await axios(configuration);
        const data = res.data;
        dispatch({ type: "CREATED_PLAYLIST", payload: data.data.playlist });
        dispatch({ type: "SET_LOADER", payload: false });
        dispatch({ type: "CLOSE_MODAL" })

    } catch (err) {
        console.log(err);
    }
}

export const getPlaylistVideos = async ({ state, action: { payload: { playlistId, userId } } }, dispatch) => {
    try {
        dispatch({ type: "SET_LOADER", payload: true });
        const token = localStorage.getItem("token");
        const configuration = {
            method: "GET",
            url: `${BASE_URL}users/${userId}/playlists/${playlistId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios(configuration);
        const data = res.data;
        const playlist = data.data.playlist;
        dispatch({ type: "GET_PLAYLIST_VIDEOS", payload: playlist.videos });
        dispatch({ type: "SET_LOADER", payload: false });

    } catch (err) {
        console.log(err);
        dispatch({ type: "SET_LOADER", payload: false });
    }
};

export async function addVideoToPlaylist({ state, action }, dispatch) {
    try {
        const token = localStorage.getItem("token");
        const configuration = {
            method: "PATCH",
            url: `${BASE_URL}users/${action.payload.userId}/playlists/${action.payload.playlistId}/videos/${action.payload.videoId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios(configuration);
        dispatch({ type: "CLOSE_MODAL" })
        myToast("success", "Added video to playlist successfully");
    } catch (err) {
        myToast("error", err.response.data.message);
        console.log(err);
        dispatch({ type: "SET_LOADER", payload: false });
    }
}

export async function removeVideoFromPlaylist(payload, dispatch) {
    try {
        const token = localStorage.getItem("token");
        const configuration = {
            method: "DELETE",
            url: `${BASE_URL}users/${payload.userId}/playlists/${payload.playlistId}/videos/${payload.videoId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        dispatch({ type: "SET_LOADER", payload: true });
        const res = await axios(configuration);
        const data = res.data;
        myToast("success", data.message);
        dispatch({
            type: "REMOVE_VIDEO_FROM_PLAYLIST",
            payload: data.data.playlist.videos,
        });
        dispatch({ type: "SET_LOADER", payload: false });
    } catch (err) {
        dispatch({ type: "SET_LOADER", payload: false }); console.log(err);
    }
}

export async function deletePlaylist({ state, action }, dispatch) {
    const playlistId = action.payload.playlistId;
    const token = localStorage.getItem("token");
    const configuration = {
        method: "DELETE",
        url: `${BASE_URL}users/${action.payload.userId}/playlists/${playlistId}`,
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        dispatch({ type: "SET_LOADER", payload: true });
        await axios(configuration);
        myToast("success", "Playlist deleted successfully");
        dispatch({ type: "SET_LOADER", payload: false });
        dispatch({ type: "DELETE_PLAYLIST", payload: state.playlists.filter(playlist => playlist._id !== playlistId) });
    } catch (err) {
        console.log(err);
        dispatch({ type: "SET_LOADER", payload: false });
    }
}