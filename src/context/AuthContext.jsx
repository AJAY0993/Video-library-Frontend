import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import myToast from "../utils/customToast";
import { BASE_URL } from "../utils/baseurl";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(null);

  //signup
  async function signup(username, email, password) {
    const configuration = {
      method: "POST",
      url: `${BASE_URL}users/signup`,
      data: {
        username: username,
        email: email,
        password: password,
      },
    };
    try {
      setIsLoading(true);
      const res = await axios(configuration);
      const data = res.data;
      if (data.status === "success") {
        setIsAuthenticated(true);
        localStorage.setItem("token", data.data.token);
        toast.success("Signed UP successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err) {
      myToast("error", err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  //login
  async function login(email, password) {
    const configuration = {
      method: "POST",
      url: `${BASE_URL}users/login`,
      data: {
        email,
        password,
      },
    };
    try {
      setIsLoading(true);
      myToast("info", "Please wait a moment");
      const res = await axios(configuration);
      if (res.data.status === "success") {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        setIsAuthenticated(true);
        setUser(res.data.data.user);
        navigate("/", { replace: true });
        myToast("success", "Logged in successfully");
      }
    } catch (err) {
      console.log(err);
      myToast("error", err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  //logout
  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUser(null);
    myToast("success", "Logged out");
  };

  useEffect(() => {
    setIsLoading(true);
    const getUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const configuration = {
          method: "GET",
          url: `${BASE_URL}users/my/profile`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios(configuration);
        const data = res.data;
        console.log(data);
        if (data.status === "success") {
          setUser(data.data.user);
          setIsAuthenticated(true);
          myToast("success", "Welcome back");
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, []);

  const value = {
    login,
    logout,
    signup,
    user,
    setUser,
    isAuthenticated,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Auth context was used outside the AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
