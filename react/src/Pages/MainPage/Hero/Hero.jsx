import styles from "./Hero.module.css";
import FloatingObject from "@Pages/MainPage/FloatingObject/FloatingObject";
import OBJViewer from "@Components/OBJViewer.jsx";
import fullOpacity from "@Assets/full_opacity.jpg";
import transparent from "@Assets/transparent.jpg";
const Hero = () => {
  return (
    <section className={`${styles.Hero} Container`}>
      <h1 className={styles.HeroTitle}>
        <span>AI Assisted</span> CT Viewer <br />
        Featuring Segmentations And 3D Vision
      </h1>
      <div className={styles.HeroVideo}>
        <OBJViewer plyUrl="/models/combined_fps_pointcloud4_transformed.ply"/>
      </div>
      <div className={styles.Curve}>
        <svg viewBox="0 0 1440 150" preserveAspectRatio="none">
          <path d="M0,0 C480,100 960,0 1440,100 L1440,150 L0,150 Z" fill="#f5f5f5"/>
        </svg>
      </div>

    </section>
  );
};

export default Hero;
