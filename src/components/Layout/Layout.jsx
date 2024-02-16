import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import Header from "../Header/Header";
import Modal from "../Modal/Modal";
import SideNavBar from "./../SideNavBar/SideNavBar";
import styles from "./Layout.module.css";

function Layout({ children }) {
  const { state } = useData();
  return (
    <>
      <div className="wrapper-container">
        {state.showModal && <Modal />}
        <div>
          <SideNavBar />
          <Header />
          <main className={styles.main}>{children}</main>
        </div>
      </div>
    </>
  );
}

export default Layout;
