import Layout from "../../components/Layout/Layout";
import NotLoggedIn from "../../components/NotLoggedIn/NotLoggedIn";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import NothingToSee from "../../components/NothingToSee/NothingToSee";
import PlaylistCard from "../../components/PlaylistCard/PlaylistCard";
import Button, { BackButton } from "../../components/Button/Button";

function Playlists() {
  const { isAuthenticated } = useAuth();
  const { reducerFunc, dispatch, playlists } = useData();
  const createPlaylist = () => {
    reducerFunc.setModalType(
      {
        undefined,
        action: { payload: "createPlaylist" },
      },
      dispatch
    );
    reducerFunc.openModal(undefined, dispatch);
  };
  return (
    <Layout>
      <section className="page">
        {!isAuthenticated && <NotLoggedIn />}
        {isAuthenticated && (
          <>
            <BackButton />
            <div className="container d-flex j-center wrap g-2 p-1">
              {playlists.length < 1 ? (
                <NothingToSee />
              ) : (
                playlists.map((playlist, i) => (
                  <PlaylistCard playlist={playlist} key={i + 1} />
                ))
              )}
            </div>
            <Button className="button--primary m-auto" onClick={createPlaylist}>
              Create New
            </Button>
          </>
        )}
      </section>
    </Layout>
  );
}

export default Playlists;
