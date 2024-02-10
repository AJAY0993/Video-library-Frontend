import Layout from "../../components/Layout/Layout";
import { Outlet } from "react-router";

function Explore() {
  return (
    <Layout>
      <section className="page">
        <Outlet />
      </section>
    </Layout>
  );
}

export default Explore;
