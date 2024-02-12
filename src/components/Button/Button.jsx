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

export default Button;
