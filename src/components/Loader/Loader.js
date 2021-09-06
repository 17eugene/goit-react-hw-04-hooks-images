import { ImSpinner } from "react-icons/im";

import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.spinContainer}>
      <ImSpinner className={styles.spinner} size="80" />
    </div>
  );
}

export { Loader };
