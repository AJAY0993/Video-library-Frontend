import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import Layout from "../../components/Layout/Layout";
import NotLoggedIn from "../../components/NotLoggedIn/NotLoggedIn";
import VideosContainer from "../../components/VideosContainer/VideosContainer";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import NothingToSee from "../../components/NothingToSee/NothingToSee";

function History() {
  const { isAuthenticated } = useAuth();
  const { state, reducerFunc, dispatch } = useData();
  const { isLoading } = state;

  return (
    <Layout>
      <section className="page">
        {!isAuthenticated && <NotLoggedIn />}

        {isAuthenticated && state.history.length < 1 && <NothingToSee />}
        {isAuthenticated && state.history.length > 0 && !state.isLoading && (
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
            <VideosContainer type="history"></VideosContainer>
          </>
        )}
      </section>
    </Layout>
  );
}

export default History;
