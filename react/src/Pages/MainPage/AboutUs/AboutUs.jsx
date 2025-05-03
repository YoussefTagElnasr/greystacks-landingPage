// AboutUs.jsx
import styles from "./AboutUs.module.css";
import teeth from "@Assets/crowdingTeeth.png";
import chatbot from "@Assets/multimodal_chat_demo2.jpg"
import object_detection from "@Assets/demo_object_detection.png"
import OutlinedLinkButton from "@Components/Button/Outlined/OutlinedLinkButton";
import { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import CtImage from "@Assets/CT image.png"
import viewer3d from "@Assets/3d viewer.png"
import OBJViewer from "../../../components/OBJViewer";
import tools from "@Assets/tools.png"
import FadeInOnScroll from "../../../components/FadeInOnScroll";

const AboutUs = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.5 1"],
    });
    const width = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <section className={`${styles.AboutUs}`} id="AboutUs" ref={ref}>
            <motion.div className={styles.leftLine} style={{ width: width }}></motion.div>
            <motion.div className={styles.rightLine} style={{ width: width }}></motion.div>
            <div className={styles.AboutUsInfo}>
                <br />
                <div className={styles.OurServices}>
                    <h1>our services</h1>
                </div>
                <div className={styles.PartOne}>
                    <FadeInOnScroll from="left" className={styles.firstFeature}>
                        <h2>Seamless CT Scan Viewing and Sharing in Your Browser</h2>
                        <ul>
                            <li>We provide a powerful platform for CT scan centers to effortlessly upload, view, and share scans directly through a web browser</li>
                            <br />
                            <li>no software installation required. Sharing scans with clients has never been easier</li>
                        </ul>
                    </FadeInOnScroll>
                    <FadeInOnScroll from="right">
                        <img src={CtImage} alt="ct" />
                    </FadeInOnScroll>
                </div>
                <div className={styles.PartTwo}>
                    <FadeInOnScroll from="left">
                        <OBJViewer plyUrl="/models/combined_fps_pointcloud.ply"/>
                    </FadeInOnScroll>
                    <FadeInOnScroll from="right" className={styles.SecFeature}>
                        <h2>AI-Powered Segmentation & 3D Visualization</h2>
                        <ul>
                            <li>Our advanced AI segmentation enables dynamic 3D visualizations of CT scans.</li>
                            <br />
                            <li> Users can isolate and toggle anatomical structures for a clearer diagnostic experience without the need to manually adjust scan layers or shift settings</li>
                        </ul>
                    </FadeInOnScroll>
                </div>
                <div className={styles.PartOne}>
                    <FadeInOnScroll from="left" className={styles.firstFeature}>
                        <h2>Precision Tools for Diagnosis</h2>
                        <ul>
                            <li>Our platform offers a comprehensive viewing experience with features like crosshairs for precise orientation, multi-angle reconstructions, and support for detailed measurement and calibration</li>
                            <br />
                            <li>These tools are available for both standard image formats and DICOM (.dcm) files.</li>
                        </ul>
                    </FadeInOnScroll>
                    <FadeInOnScroll from="right">
                        <img src={tools} alt="tools" />
                    </FadeInOnScroll>
                </div>
                <div className={styles.trynow}>
                    <h2>Easily upload and view a wide range of file formats, including:
                        .jpg, .jpeg, .png, .pdf, .stl, .obj, and .dcm.
                    </h2>
                    <br />
                    <button><span>Try Now</span></button>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
