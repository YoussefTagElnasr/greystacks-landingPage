import { Link } from "react-router-dom";
import mainLogo from "@Assets/logo.svg";
import styles from "./Header.module.css";
import admin from "@Assets/admin-svgrepo-com.svg"
import storage from "@Assets/storage-box-storage-box-svgrepo-com.svg"
import viewer from "@Assets/data-viewer-svgrepo-com.svg"

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={mainLogo} alt="Our Logo" className={styles.logo} />
      </Link>
      <div className={styles.buttonGroup}>
        <button className={styles.left}><img src={admin} alt="admin" /></button>
        <button className={styles.center}><img src={storage} alt="storage" /></button>
        <button className={styles.right}><img src={viewer} alt="viewer" /></button>
      </div>
    </header>
  );
};

export default Header;
