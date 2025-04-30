import styles from "./Submit.module.css";
const Submit = ({children, onClick, disabled}) => {
    return (
        <button type="submit" className={styles.Submit} disabled={disabled} onClick={onClick}>{children}</button>
    );
};

export default Submit;