import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useAuth } from "../../context/AuthContext";
import Button from "../Button/Button";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <div className={`wrapper-container ${styles.header}`}>
        <nav>
          <div className={styles.logo}>
            <img
              src="https://i.ibb.co/4Ywt8tD/vidvault-high-resolution-logo-transparent.png"
              alt="vidvault-high-resolution-logo-transparent"
              border="0"
            ></img>
          </div>
          <ul className={styles.linkList}>
            {!isAuthenticated ? (
              <>
                <li>
                  <Button
                    onClick={() => navigate("/login")}
                    className="button--primary"
                  >
                    Login
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={() => navigate("/signup")}
                    className="button--secondary"
                  >
                    Sign up
                  </Button>
                </li>
              </>
            ) : (
              <li>
                <Button onClick={logout} className="button--primary">
                  Logout
                </Button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

// <li>
// <Link className={styles.link} to="/signin">
//   SIGN IN
// </Link>
// </li>
