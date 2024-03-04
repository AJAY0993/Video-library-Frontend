import { BackButton } from "../components/Button/Button"
import Layout from "../components/Layout/Layout"
import NotLoggedIn from "../components/NotLoggedIn/NotLoggedIn"
import NothingToSee from "../components/NothingToSee/NothingToSee"
import CardsContainer from "../components/CardsContainer/CardsContainer"
import { useAuth } from "../context/AuthContext"
import { useData } from "../context/DataContext"
import MyLoader from "../components/MyLoader/MyLoader"

function WatchLater() {
  const { isAuthenticated } = useAuth()
  const { watchLater, isLoading } = useData()
  return (
    <Layout>
      <section className="page">
        {!isAuthenticated ? (
          <NotLoggedIn />
        ) : (
          <>
            <BackButton />
            {isLoading && <MyLoader />}
            {isAuthenticated && watchLater.length < 1 && <NothingToSee />}
            {isAuthenticated && watchLater.length > 0 && (
              <CardsContainer videos={watchLater} />
            )}
          </>
        )}
      </section>
    </Layout>
  )
}

export default WatchLater
