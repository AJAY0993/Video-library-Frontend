import { createContext, useContext, useEffect, useState } from "react";

const VideoContext = createContext();
function VideoProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:9000/data");
        const data = await res.json();
        let genres = data.map((x) => x.categoryName);
        genres = [...new Set(genres)];
        setCategories((g) => genres);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        //   setIsLoading(true);
        const res = await fetch("http://localhost:3000/api/v1/videos");
        const data = await res.json();
        if (filter === "all") setVideos(data.data.videos);
        else {
          setVideos(
            data.data.videos.filter((video) => video.category === filter)
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        //   setIsLoading(false);
      }
    };
    fetchVideos();
  }, [filter]);

  return (
    <VideoContext.Provider
      value={{
        categories,
        videos,
        filter,
        isLoading,
        setCategories,
        setVideos,
        setIsLoading,
        setFilter,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

function useVideo() {
  return useContext(VideoContext);
}
export { VideoProvider, useVideo };
