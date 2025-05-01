import teeth from "@Assets/crowdingTeeth.png";
import OBJViewer from "../../../components/OBJViewer";
import styles from "./Hero.module.css";
const Hero = () => {
    return (
        <section className={`${styles.Hero} Container`}>
            <h1>
                <span>AI Assisted</span> CT Viewer <br/>
                Featuring Segmentations And 3D vision
            </h1>
            <div className={`${styles.HeroVideo} Container`}>
            <OBJViewer objUrl="/models/Chocolate_Splash_Free_005.obj" />
            </div>
        </section>
    );
};

export default Hero;