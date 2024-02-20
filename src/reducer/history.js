import axios from "axios";
import { BASE_URL } from "../utils/baseurl";
import myToast from "../utils/customToast";

export async function getHistory(_, dispatch) {
    try {
        dispatch({ type: "SET_LOADER", payload: true });
        const token = localStorage.getItem("token");
        const configuration = {
            method: "GET",
            url: `${BASE_URL}users/history`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios(configuration);
        const data = res.data.data;
        dispatch({ type: "GET_HISTORY", payload: data.history.reverse() });
        dispatch({ type: "SET_LOADER", payload: false });
    } catch (err) {
        console.log(err);
    }
}

export async function addVideoToHistory({ state, action }, dispatch) {
    dispatch({ type: "SET_LOADER", payload: true });
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
    dispatch({ type: "SET_LOADER", payload: false });
}

export async function clearHistory(_, dispatch) {
    dispatch({ type: "SET_LOADER", payload: true });
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
    dispatch({ type: "SET_LOADER", payload: false });
}

export async function removeVideoFromHistory({ state, action }, dispatch) {
    dispatch({ type: "SET_LOADER", payload: true });
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
        dispatch({ type: "SET_LOADER", payload: false });

    } catch (err) {
        dispatch({ type: "SET_LOADER", payload: false });
        console.log(err);
    }
}