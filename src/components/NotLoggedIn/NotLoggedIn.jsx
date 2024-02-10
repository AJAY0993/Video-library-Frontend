import { useNavigate } from "react-router";
import Button from "../Button/Button";

function NotLoggedIn() {
  const style = {
    textAlign: "center",
  };

  const navigate = useNavigate();

  return (
    <div style={style}>
      <p className="sub-title">You have to login to view this</p>
      <Button className={"button--primary"} onClick={() => navigate("/login")}>
        Login
      </Button>
    </div>
  );
}

export default NotLoggedIn;
