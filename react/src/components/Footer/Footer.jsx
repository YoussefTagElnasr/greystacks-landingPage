import styles from "./Footer.module.css";
import mainLogo from "@Assets/logo-cropped.svg";
const Footer = () => {
    let year = new Date;
    year = year.getFullYear();
    return (
        <footer className={styles.Footer}>
            <img src={mainLogo} alt="Our Logo" style={{ height: '220px' }} />
            <p>Copyright © {year} Greystacks</p>
            <div className={styles.Footerlinks}>
            </div>
        </footer>
    );
};

export default Footer;