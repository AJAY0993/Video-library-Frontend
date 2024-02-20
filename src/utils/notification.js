import { getToken } from "firebase/messaging";
import { messaging } from "../firebase/firebaseConfig";

const { VITE_APP_VAPID_KEY } = import.meta.env;

export default async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
        const token = await getToken(messaging, {
            vapidKey: VITE_APP_VAPID_KEY,
        });

        //We can send token to server
        console.log("Token generated : ", token);
    } else if (permission === "denied") {
        //notifications are blocked
        alert("You denied for the notification");
    }
}