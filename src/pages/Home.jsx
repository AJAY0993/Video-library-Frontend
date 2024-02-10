import { ToastContainer } from "react-toastify";
import GenreContainer from "../components/GenreContainer/GenreContainer";
import Hero from "../components/Hero/Hero";
import Layout from "../components/Layout/Layout";
import { useData } from "../context/DataContext";
import MyLoader from "../components/MyLoader/MyLoader";

function Home() {
  const { state } = useData();
  const { isLoading } = state;
  return (
    <Layout>
      <section className="page">
        {isLoading ? (
          <MyLoader />
        ) : (
          <>
            <Hero />
            <GenreContainer />
            <ToastContainer />
          </>
        )}
      </section>
    </Layout>
  );
}

export default Home;
