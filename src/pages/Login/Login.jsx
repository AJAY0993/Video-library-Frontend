import { useRef } from "react"
import styles from "./Login.module.css"
import Layout from "../../components/Layout/Layout"
import { useAuth } from "../../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import Button from "../../components/Button/Button"

function Login() {
  const navigate = useNavigate()
  const { isAuthenticated, login, isLoading } = useAuth()
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  if (isAuthenticated) {
    return navigate("/", { replace: true })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    login(emailRef.current.value, passwordRef.current.value)
  }
  return (
    <Layout>
      <div className={styles.container}>
        <form action="" className={styles.loginForm} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input ref={emailRef} placeholder={"email"} />
          <input ref={passwordRef} placeholder={"password"} />
          <Button
            className="button--submit"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Please wait" : "Login"}
          </Button>
        </form>
        <p className={styles.loginText}>
          New to Vid vault? <Link to="/signup">Sign up</Link> now.
        </p>
        <p
          className={styles.loginText}
          onClick={() => {
            emailRef.current.value = "testuser@gmail.com"
            passwordRef.current.value = "testpassword"
          }}
        >
          Countinue as guest?
        </p>
      </div>
    </Layout>
  )
}

export default Login
