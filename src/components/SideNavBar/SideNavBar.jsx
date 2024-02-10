import { NavLink } from "react-router-dom";

import styles from "./SideNavBar.module.css";
function SideNavBar() {
  return (
    <nav className={styles.sideNav}>
      <NavLink className={styles.navListIcon} to="/">
        <img src="https://i.ibb.co/sVQPY0m/home.png" alt="home"></img>
      </NavLink>

      <NavLink className={styles.navListIcon} to="/explore">
        <img src="https://i.ibb.co/5Bw21F4/explore.png" alt="explore"></img>
      </NavLink>

      <NavLink className={styles.navListIcon} to="/playlist">
        <img
          src="https://i.ibb.co/xD1gCR1/playlist.png"
          alt="playlist"
          border="0"
        ></img>
      </NavLink>

      <NavLink className={styles.navListIcon} to="/liked">
        <img
          src="https://i.ibb.co/XL0hQr7/like.png"
          alt="like"
          border="0"
        ></img>
      </NavLink>

      <NavLink className={styles.navListIcon} to="/watchlater">
        <img
          src="https://i.ibb.co/CwCpHVw/clock.png"
          alt="clock"
          border="0"
        ></img>{" "}
      </NavLink>

      <NavLink className={styles.navListIcon} to="/history">
        <img
          src="https://i.ibb.co/WgK7XQv/history.png"
          alt="history"
          border="0"
        ></img>
      </NavLink>
    </nav>
  );
}

export default SideNavBar;
