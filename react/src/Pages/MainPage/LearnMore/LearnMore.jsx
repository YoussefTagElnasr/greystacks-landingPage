import styles from "./LearnMore.module.css"
import OutLinedLinkButton from "@Components/Button/Outlined/OutlinedLinkButton"
const LearnMore = () => {
    return (
        <section className={`${styles.LearnMore} Container`}>
            <div className={styles.Content}>
                <h2>Would you like to learn more?</h2>
                <p>Feel free to schedule a meeting with us.</p>
                <OutLinedLinkButton color={"white"} to={"/ContactUs"}>contact us</OutLinedLinkButton>
            </div>
        </section>
    );
};

export default LearnMore;