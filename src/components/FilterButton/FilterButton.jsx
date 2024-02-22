import { useData } from "../../context/DataContext";
import styles from "./FilterButton.module.css";

function FilterButton({ text }) {
  const { state, dispatch } = useData();
  function onClick() {
    dispatch({ type: "SET_FILTER", payload: text });
  }
  return (
    <li>
      <button
        className={`${styles.filterBtn} ${
          text.toLowerCase() === state.filter ? "selected" : ""
        }`}
        onClick={onClick}
        disabled={state.isLoading}
      >
        {text}
      </button>
    </li>
  );
}

export default FilterButton;
