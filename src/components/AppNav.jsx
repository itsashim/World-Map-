import styles from "./AppNav.module.css";

function AppNav() {
  return (
    <nav className={styles.nav}>
      <p>Cities</p>
      <p>Countries</p>
    </nav>
  );
}

export default AppNav;
