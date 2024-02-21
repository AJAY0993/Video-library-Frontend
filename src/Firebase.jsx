import { onMessage } from "firebase/messaging";
import { messaging } from "./firebase/firebaseConfig";
import myToast from "./utils/customToast";
import { useEffect, useState } from "react";
import { getToken } from "firebase/messaging";
import { BASE_URL } from "./utils/baseurl";
import axios from "axios";

function Firebase({ children }) {
  const { VITE_APP_VAPID_KEY } = import.meta.env;
  const [token, setToken] = useState();
  const jwtToken = localStorage.getItem("token");
  async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      try {
        const token = await getToken(messaging, {
          vapidKey: VITE_APP_VAPID_KEY,
        });

        //We can send token to server
        const configuration = {
          url: `${BASE_URL}users/my/profile`,
          method: "PATCH",
          headers: { Authorization: `Bearer ${jwtToken}` },
          data: { firebaseToken: token },
        };
        await axios(configuration);
      } catch (err) {
        console.log(err);
      }
    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
    }
  }
  onMessage(messaging, (payload) => {
    myToast("info", payload.notification.body);
  });
  useEffect(() => {
    requestPermission();
  }, []);
  return <>{children}</>;
}

export default Firebase;
