import teeth from "@Assets/crowdingTeeth.png";
import styles from "./Hero.module.css";
const Hero = () => {
    return (
        <section className={`${styles.Hero} Container`}>
            <h1>
                <span>AI Assisted</span> CT Viewer <br/>
                Featuring Segmentations And 3D vision
            </h1>
            <div className={`${styles.HeroVideo} Container`}>
                <img src={teeth} alt="" />
            </div>
        </section>
    );
};

export default Hero;