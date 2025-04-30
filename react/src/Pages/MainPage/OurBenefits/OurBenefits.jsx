import BoltIcon from '@mui/icons-material/Bolt';
import ShieldIcon from '@mui/icons-material/Shield';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PublicIcon from '@mui/icons-material/Public';
import MedicationIcon from '@mui/icons-material/Medication';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';

import styles from "./OurBenefits.module.css";
const OurBenefits = () => {
    return (
        <section className={`${styles.Benefits} Container`}>
            <h2>Benefits and impact</h2>
            <div className={styles.BenefitsContainer}>
                <div className={styles.Benefit}>
                    <div className={styles.BenefitHead}>
                    <BoltIcon/>
                    <h3>quick integration</h3>
                    </div>
                    <p>refer to our documentation for a rapid and easy integration.</p>
                </div>
                <div className={styles.Benefit}>
                <div className={styles.BenefitHead}>
                    <ShieldIcon/>
                    <h3>faster & easier</h3>
                </div>
                    <p>Faster data validation and processing, improved Dynamic Rx forms.</p>
                </div>
                <div className={styles.Benefit}>
                <div className={styles.BenefitHead}>
                    <DashboardCustomizeIcon/>
                    <h3>customizable</h3>
                </div>
                    <p>Customize functionality of our LLM and computer vision capabilities to better serve your application.
                    </p>
                </div>
                <div className={styles.Benefit}>
                <div className={styles.BenefitHead}>
                    <PublicIcon/>
                    <h3>Convenience for patients</h3>
                </div>
                    <p>Enhanced post-operative instructions and support.
                    </p>
                </div>
                <div className={styles.Benefit}>
                <div className={styles.BenefitHead}>
                    <MedicationIcon/>
                    <h3>Data security</h3>
                </div>
                    <p>We support on premise deployment to keep your data with you.</p>
                </div>
                <div className={styles.Benefit}>
                <div className={styles.BenefitHead}>
                    <IntegrationInstructionsIcon/>
                    <h3>we listen</h3>
                </div>
                    <p>Reach out to our representatives to develop a specific feature tailored to your needs.</p>
                </div>
            </div>
        </section>
    );
};

export default OurBenefits;