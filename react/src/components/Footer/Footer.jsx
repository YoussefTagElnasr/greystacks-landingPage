import styles from "./Footer.module.css";
import mainLogo from "@Assets/logo-cropped.svg";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.Footer}>
    <div className={styles.content}>
        <img src={mainLogo} alt="logo" />
        <span>© 2025 Greystacks. All rights reserved.</span>
    </div>
</footer>

    );
};

export default Footer;
