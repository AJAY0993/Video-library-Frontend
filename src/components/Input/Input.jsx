import styles from "./Input.module.css";

function Input({ value, setter, placeholder }) {
  return (
    <div>
      <label htmlFor={placeholder} className={styles.label}>
        {placeholder}
        <input
          className={styles.input}
          type="text"
          value={value}
          onChange={(e) => setter(e.target.value)}
          placeholder={placeholder}
          id={placeholder}
        />
      </label>
    </div>
  );
}

export default Input;
