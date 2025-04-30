import { Link } from "react-router-dom";
import styles from "./ContainedLinkButton.module.css";
const ContainedLinkButton = ({to, children, color = "white"}) => {
    return (
        <Link to={to} className={styles.OutlinedLinkButton} style={{color}}>{children}</Link>
    );
};

export default ContainedLinkButton;