import { Outlet } from "react-router";
import Button from "../components/Button/Button";
import Layout from "../components/Layout/Layout";
import NotLoggedIn from "../components/NotLoggedIn/NotLoggedIn";
import { useAuth } from "../context/AuthContext";

function Playlist() {
  const { isAuthenticated } = useAuth();
  return (
    <Layout>
      <section className="page">
        {!isAuthenticated && <NotLoggedIn />}
        {isAuthenticated && <Outlet />}
      </section>
    </Layout>
  );
}

export default Playlist;
