import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Explore from "./pages/Explore/Explore";
import Playlists from "./pages/Playlists/Playlists";
import Library from "./pages/Liked";
import WatchLater from "./pages/WatchLater";
import History from "./pages/History/History";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import Videos from "./components/Videos/Videos";
import PageNotFound from "./pages/PageNotFound";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { ToastContainer } from "react-toastify";
import { DataProvider } from "./context/DataContext";
import PageForEachPlaylist from "./pages/PageForEachPlaylist/PageForEachPlaylist";
import { useEffect } from "react";
import myToast from "./utils/customToast";
import Firebase from "./Firebase";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Firebase>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />}>
                <Route index element={<Videos />} />
                <Route path=":id" element={<VideoPlayer />} />
              </Route>
              <Route path="/playlists">
                <Route index element={<Playlists />} />
                <Route path=":id" element={<PageForEachPlaylist />} />
              </Route>
              <Route path="/liked" element={<Library />} />
              <Route path="/watchLater" element={<WatchLater />} />
              <Route path="/history" element={<History />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Firebase>
          <ToastContainer
            toastClassName="custom-toast"
            bodyClassName="custom-toast-body"
          />
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
