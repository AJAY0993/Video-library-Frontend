import styles from "./Button.module.css";

function Button({ children, onClick, className = "button--primary" }) {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
