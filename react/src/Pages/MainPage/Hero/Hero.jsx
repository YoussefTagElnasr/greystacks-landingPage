import teeth from "@Assets/crowdingTeeth.png";
import OBJViewer from "../../../components/OBJViewer";
import styles from "./Hero.module.css";
import video from "@Assets/ssyoutube.site - duel of the fates (720p).mp4";

const Hero = () => {
    return (
        <section className={`${styles.Hero} Container`}>
            <h1 className={styles.HeroTitle}>
                <span>AI Assisted</span> CT Viewer <br />
                Featuring Segmentations And 3D Vision
            </h1>
            <div className={styles.HeroVideo}>
                <video src={video} autoPlay muted loop playsInline></video>
            </div>

            <div className={styles.Curve}>
                <svg viewBox="0 0 1440 150" preserveAspectRatio="none">
                    <path d="M0,0 C480,100 960,0 1440,100 L1440,150 L0,150 Z" fill="#f5f5f5" />
                </svg>
            </div>
        </section>
    );
};

export default Hero;
