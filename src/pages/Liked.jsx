import { BackButton } from "../components/Button/Button";
import CardsContainer from "../components/CardsContainer/CardsContainer";
import Layout from "../components/Layout/Layout";
import NotLoggedIn from "../components/NotLoggedIn/NotLoggedIn";
import NothingToSee from "../components/NothingToSee/NothingToSee";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

function Library() {
  const { isAuthenticated } = useAuth();
  const { liked } = useData();
  return (
    <Layout>
      <section className="page">
        {!isAuthenticated ? (
          <NotLoggedIn />
        ) : (
          <>
            <BackButton />
            {isAuthenticated && liked.length < 1 && <NothingToSee />}
            {isAuthenticated && liked.length > 0 && (
              <CardsContainer videos={liked} />
            )}
          </>
        )}
      </section>
    </Layout>
  );
}

export default Library;
