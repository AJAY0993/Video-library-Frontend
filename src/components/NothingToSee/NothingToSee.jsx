import { useNavigate } from "react-router";
import Button from "../Button/Button";
import styles from "./NothingToSee.module.css";
function NothingToSee() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <img
        src="https://i.ibb.co/3hny65X/undraw-Empty-re-opql-removebg-preview.png"
        alt="undraw-Empty-re-opql-removebg-preview"
        border="0"
      ></img>
      <Button onClick={() => navigate("/explore")}>Explore</Button>
      <h3>Nothing to see here ☹️</h3>
    </div>
  );
}

export default NothingToSee;
