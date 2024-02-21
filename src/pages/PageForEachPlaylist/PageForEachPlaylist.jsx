import { useParams } from "react-router";
import Layout from "../../components/Layout/Layout";
import NotLoggedIn from "../../components/NotLoggedIn/NotLoggedIn";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import NothingToSee from "./../../components/NothingToSee/NothingToSee";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { BackButton } from "../../components/Button/Button";
import MyLoader from "../../components/MyLoader/MyLoader";

function PageForEachPlaylist() {
  const { isAuthenticated, user } = useAuth();
  const { state, reducerFunc, dispatch, playlistVideos, isLoading } = useData();
  const { id } = useParams();

  useEffect(() => {
    isAuthenticated &&
      reducerFunc.getPlaylistVideos(
        { state, action: { payload: { playlistId: id, userId: user._id } } },
        dispatch
      );
  }, []);

  return (
    <Layout>
      <section className="page">
        <BackButton />
        {!isAuthenticated && <NotLoggedIn />}
        {isAuthenticated &&
          (isLoading ? (
            <MyLoader />
          ) : playlistVideos.length < 1 ? (
            <NothingToSee />
          ) : (
            <CardsContainer videos={playlistVideos} />
          ))}
      </section>
    </Layout>
  );
}

export default PageForEachPlaylist;
