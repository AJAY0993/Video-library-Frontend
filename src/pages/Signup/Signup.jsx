import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/AuthContext";
import myToast from "../../utils/customToast";
import Button from "../../components/Button/Button";

function Signup() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const { isAuthenticated, signup } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) return navigate("/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !usernameRef.current?.value ||
      !passwordRef.current?.value ||
      !emailRef.current?.value ||
      !confirmPasswordRef.current?.value
    ) {
      myToast("error", "Please fill all the fields");
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      myToast("error", "Passwords doesn't match");
      return;
    }
    try {
      signup(
        usernameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
    } catch (error) {
      myToast("error", "Error in Creating Account");
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <form className={styles.signupForm} onSubmit={handleSubmit}>
          <h2>Sign up</h2>
          <input
            type="username"
            ref={usernameRef}
            placeholder="username"
          ></input>
          <input type="email" ref={emailRef} placeholder="email"></input>
          <input
            type="password"
            ref={passwordRef}
            placeholder="password"
          ></input>
          <input
            type="password"
            ref={confirmPasswordRef}
            placeholder="confirm-password"
          ></input>
          <Button className="button--submit" onClick={handleSubmit}>
            Sign up
          </Button>
        </form>
        <p className={styles.signupText}>
          Already a User? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </Layout>
  );
}

export default Signup;
