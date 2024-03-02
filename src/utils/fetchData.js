import axios from "axios";
import { BASE_URL } from "./baseurl";
import myToast from "./customToast";

export default async function fetchData(endpoint, actionType, payloadKey = null, dispatch) {
    const url = BASE_URL + endpoint;
    const token = localStorage.getItem("token") || "";
    try {
        dispatch({ type: "SET_LOADER", payload: true });
        const configuration = {
            url,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await axios(configuration);
        const data = res.data;

        dispatch({ type: actionType, payload: data.data[payloadKey] });
        dispatch({ type: "SET_LOADER", payload: false });
    } catch (err) {
        dispatch({ type: "SET_LOADER", payload: false });
        console.log(err);
        myToast("error", err.response.data.messagge);
    }
}