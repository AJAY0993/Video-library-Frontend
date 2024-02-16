import { NavLink } from "react-router-dom";

import styles from "./SideNavBar.module.css";
function SideNavBar() {
  return (
    <nav className={styles.sideNav}>
      <NavLink to="/" className={styles.navLink}>
        <div className={styles.navListIcon}>
          <img src="https://i.ibb.co/sVQPY0m/home.png" alt="home"></img>
        </div>
        <span className={styles.navLinkText}>Home</span>
      </NavLink>

      <NavLink to="/explore" className={styles.navLink}>
        <div className={styles.navListIcon}>
          <img src="https://i.ibb.co/5Bw21F4/explore.png" alt="explore"></img>
        </div>
        <span className={styles.navLinkText}>Explore</span>
      </NavLink>

      <NavLink to="/playlists" className={styles.navLink}>
        <div className={styles.navListIcon}>
          <img src="https://i.ibb.co/xD1gCR1/playlist.png" alt="playlist"></img>
        </div>
        <span className={styles.navLinkText}>Playlists</span>
      </NavLink>

      <NavLink to="/liked" className={styles.navLink}>
        <div className={styles.navListIcon}>
          <img src="https://i.ibb.co/XL0hQr7/like.png" alt="like"></img>
        </div>
        <span className={styles.navLinkText}>Liked</span>
      </NavLink>

      <NavLink to="/watchlater" className={styles.navLink}>
        <div className={styles.navListIcon}>
          <img src="https://i.ibb.co/CwCpHVw/clock.png" alt="clock"></img>
        </div>
        <span className={styles.navLinkText}>Watchlater</span>
      </NavLink>

      <NavLink to="/history" className={styles.navLink}>
        <div className={styles.navListIcon}>
          <img src="https://i.ibb.co/WgK7XQv/history.png" alt="history"></img>
        </div>
        <span className={styles.navLinkText}>History</span>
      </NavLink>
    </nav>
  );
}

export default SideNavBar;
