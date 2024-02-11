import { useData } from "../../context/DataContext";
import styles from "./DropDown.module.css";
import { copyToClipboard } from "./../../utils/copyToClipboard";

function DropDown({ vidId }) {
  const { state, reducerFunc, dispatch } = useData();
  const location = window.location.pathname;

  if (location.includes("history")) {
    return (
      <div className={styles.dropDown}>
        <ul>
          <Li onClick={() => copyToClipboard("Copied")}>
            <img
              src="https://i.ibb.co/N6W8qVD/share.png"
              alt="share"
              border="0"
            ></img>
            <span>Share</span>
          </Li>
          <Li>
            <img
              src="https://i.ibb.co/JqXFGZ5/delete.png"
              alt="delete"
              border="0"
            ></img>
            Remove
          </Li>
        </ul>
      </div>
    );
  }
  return (
    <div className={styles.dropDown}>
      <ul>
        <Li onClick={() => copyToClipboard("Copied")}>
          <img
            src="https://i.ibb.co/N6W8qVD/share.png"
            alt="share"
            border="0"
          ></img>
          <span>Share</span>
        </Li>
        <Li
          onClick={() => reducerFunc.openModal({ state, action: {} }, dispatch)}
        >
          <img
            src="https://i.ibb.co/CwCpHVw/clock.png"
            alt="clock"
            border="0"
          ></img>
          <span>Add to watch later</span>
        </Li>
        <Li
          onClick={() =>
            reducerFunc.openModal(
              { state, action: { payload: vidId } },
              dispatch
            )
          }
          className={styles.dropDownItem}
        >
          <img
            src="https://i.ibb.co/dW6jfY0/add-to-playlist-1.png"
            alt="add-to-playlist-1"
            border="0"
          ></img>
          <span>Save to Playlist</span>
        </Li>
      </ul>
    </div>
  );
}

function Li({ children, onClick }) {
  return (
    <li className={styles.dropDownItem} onClick={onClick}>
      {children}
    </li>
  );
}
export default DropDown;
