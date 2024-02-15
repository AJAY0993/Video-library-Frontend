import { useNavigate, useParams } from "react-router";
import Layout from "../../components/Layout/Layout";
import NotLoggedIn from "../../components/NotLoggedIn/NotLoggedIn";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import NothingToSee from "./../../components/NothingToSee/NothingToSee";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { BackButton } from "../../components/Button/Button";

function PageForEachPlaylist() {
  const { isAuthenticated } = useAuth();
  const { state, reducerFunc, dispatch, playlistVideos } = useData();
  const { id } = useParams();

  useEffect(() => {
    isAuthenticated &&
      reducerFunc.getPlaylistVideos(
        { state, action: { payload: id } },
        dispatch
      );
  }, [id]);

  return (
    <Layout>
      <section className="page">
        <BackButton />
        {!isAuthenticated && <NotLoggedIn />}
        {isAuthenticated &&
          (playlistVideos.length < 1 ? (
            <NothingToSee />
          ) : (
            <CardsContainer videos={playlistVideos} />
          ))}
      </section>
    </Layout>
  );
}

export default PageForEachPlaylist;
