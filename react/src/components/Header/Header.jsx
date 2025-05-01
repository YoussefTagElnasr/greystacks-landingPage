import { Link } from "react-router-dom";
import mainLogo from "@Assets/logo.svg";
import styles from "./Header.module.css";
import admin from "@Assets/admin-svgrepo-com.svg";
import storage from "@Assets/storage-box-storage-box-svgrepo-com.svg";
import viewer from "@Assets/data-viewer-svgrepo-com.svg";
import React from "react";

const Header = () => {
  const handleGreystacksClick = () => {
    window.open("https://greystacks.net", "_blank");
  };

  const handlePacsAdminClick = () => {
    window.open("https://greystacks.net/pacs-admin", "_blank");
  };

  const handleKeycloakClick = () => {
    window.open("https://greystacks.net/keycloak", "_blank");
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={mainLogo} alt="Our Logo" className={styles.logo} />
      </Link>
      <div className={styles.buttonGroup}>
        <button className={styles.left} onClick={handleGreystacksClick}>
          <img src={admin} alt="admin" />
        </button>
        <button className={styles.center} onClick={handlePacsAdminClick}>
          <img src={storage} alt="storage" />
        </button>
        <button className={styles.right} onClick={handleKeycloakClick}>
          <img src={viewer} alt="viewer" />
        </button>
      </div>
    </header>
  );
};

export default Header;
