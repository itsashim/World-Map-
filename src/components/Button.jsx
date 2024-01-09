import styles from "./Button.module.css";
import PropType from "prop-types";

function Button({ onClick, type, children }) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropType.func,
  type: PropType.any,
  children: PropType.any,
};

export default Button;
