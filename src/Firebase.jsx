import { onMessage } from "firebase/messaging";
import { messaging } from "./firebase/firebaseConfig";
import myToast from "./utils/customToast";
import { useEffect } from "react";
import { getToken } from "firebase/messaging";
import { BASE_URL } from "./utils/baseurl";
import axios from "axios";
import { useAuth } from "./context/AuthContext";

function Firebase({ children }) {
  const { VITE_APP_VAPID_KEY } = import.meta.env;
  const { isAuthenticated } = useAuth();
  const jwtToken = localStorage.getItem("token");
  async function requestPermission() {
    if (!isAuthenticated) return;
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
        const res = await axios(configuration);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
    }
  }

  useEffect(() => {
    requestPermission();
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Recieved a message");
      myToast("info", payload.data.body);
    });
    return unsubscribe;
  }, [isAuthenticated]);

  return <>{children}</>;
}

export default Firebase;
