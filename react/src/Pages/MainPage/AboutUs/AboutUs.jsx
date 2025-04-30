import styles from "./AboutUs.module.css";
import teeth from "@Assets/crowdingTeeth.png";
import chatbot from "@Assets/multimodal_chat_demo2.jpg"
import object_detection from "@Assets/demo_object_detection.png"
import OutlinedLinkButton from "@Components/Button/Outlined/OutlinedLinkButton";
import { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
const AboutUs = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll( {
        target:ref,
        offset: ["0 1", "1.5 1"],
    })
    const width = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    return (
        <section className={`${styles.AboutUs}`} id="AboutUs" ref={ref}>
            <motion.div className={styles.leftLine} style={{width: width}}></motion.div>
            <motion.div className={styles.rightLine} style={{width: width}}></motion.div>
            <section className={styles.Info}>
                <h2>AI enhanced CBCT volume comprehension</h2>
                <div className={styles.Content}>
                    <img src={object_detection} alt=""/>
                    <div className={styles.Details}>
                        <ul>
                            <li>Segment all regions of a CBCT volume.
                            </li>
                            <li>AI-Segmentations remove need of adjusting shift when viewing volume
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default AboutUs;