import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Explore from "./pages/Explore/Explore";
import Playlist from "./pages/Playlist";
import Library from "./pages/Library";
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
import PlaylistContainer from "./components/PlaylistContainer/PlaylistContainer";
import VideosContainer from "./components/VideosContainer/VideosContainer";
import Modal from "./components/Modal/Modal";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/" element={<Home />} />
            {/* <Route index element={<Modal />} /> */}
            <Route path="/explore" element={<Explore />}>
              <Route index element={<Videos />} />
              <Route path=":id" element={<VideoPlayer />} />
            </Route>
            <Route path="/playlist" element={<Playlist />}>
              <Route index element={<PlaylistContainer />} />
              <Route path=":id" element={<VideosContainer type="playlist" />} />
            </Route>
            <Route path="/liked" element={<Library />} />
            <Route path="/watchLater" element={<WatchLater />} />
            <Route path="/history" element={<History />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
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
