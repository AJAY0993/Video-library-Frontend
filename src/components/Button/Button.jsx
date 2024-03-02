import { useNavigate } from "react-router";
import styles from "./Button.module.css";

function Button({
  children,
  onClick,
  className = "button--primary",
  disabled = false,
}) {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function BackButton() {
  const navigate = useNavigate();
  return (
    <Button className="button--secondary g-1" onClick={() => navigate(-1)}>
      <img src="https://i.ibb.co/59dBCxk/return.png" alt="return" />
      Back
    </Button>
  );
}

export default Button;
