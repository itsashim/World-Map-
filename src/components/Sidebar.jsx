import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <p>List</p>
      <footer className={styles.footer}>
        <p className={styles.copyright}>@copyright 2024 Ashim Rai</p>
      </footer>
    </div>
  );
}

export default Sidebar;
