import { Link } from "react-router-dom";
import styles from "./OutlinedLinkButton.module.css";
const OutlinedLinkButton = ({to, color, children}) => {
    return (
        <Link to={to} className={styles.OutlinedLinkButton} style={{color}}>{children}</Link>
    );
};

export default OutlinedLinkButton;