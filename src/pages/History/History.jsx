import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import Layout from "../../components/Layout/Layout";
import NotLoggedIn from "../../components/NotLoggedIn/NotLoggedIn";
import VideosContainer from "../../components/CardsContainer/CardsContainer";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import NothingToSee from "../../components/NothingToSee/NothingToSee";

function History() {
  const { isAuthenticated } = useAuth();
  const { state, reducerFunc, history, dispatch } = useData();

  return (
    <Layout>
      <section className="page">
        {!isAuthenticated && <NotLoggedIn />}

        {isAuthenticated && history.length < 1 && <NothingToSee />}
        {isAuthenticated && history.length > 0 && !state.isLoading && (
          <>
            {
              <Button
                className="button--primary"
                onClick={() =>
                  reducerFunc.clearHistory({ state, action: {} }, dispatch)
                }
              >
                🗑️Clear history
              </Button>
            }
            <VideosContainer videos={history} />
          </>
        )}
      </section>
    </Layout>
  );
}

export default History;
