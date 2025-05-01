import teeth from "@Assets/crowdingTeeth.png";
import OBJViewer from "../../../components/OBJViewer";
import styles from "./Hero.module.css";
import video from "@Assets/ssyoutube.site - duel of the fates (720p).mp4"
const Hero = () => {
    return (
        <section className={`${styles.Hero} Container`}>
            <h1>
                <span>AI Assisted</span> CT Viewer <br/>
                Featuring Segmentations And 3D vision
            </h1>
            <div className={styles.HeroVideo}>
                <video src={video} autoPlay muted loop playsInline
                ></video>
            </div>
        </section>
    );
};

export default Hero;