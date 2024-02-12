import { useData } from "../../context/DataContext";
import styles from "./FilterButton.module.css";

function FilterButton({ text }) {
  const { state, reducerFunc, dispatch } = useData();
  const { setFilter } = reducerFunc;
  function onClick() {
    setFilter({ state, action: { payload: text } }, dispatch);
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
