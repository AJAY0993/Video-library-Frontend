import Layout from "../components/Layout/Layout";
import NotLoggedIn from "../components/NotLoggedIn/NotLoggedIn";
import NothingToSee from "../components/NothingToSee/NothingToSee";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

function Library() {
  const { isAuthenticated } = useAuth();
  const { state } = useData();
  return (
    <Layout>
      <section className="page">
        {!isAuthenticated && <NotLoggedIn />}
        {isAuthenticated && state.liked.length < 1 && <NothingToSee />}
      </section>
    </Layout>
  );
}

export default Library;
