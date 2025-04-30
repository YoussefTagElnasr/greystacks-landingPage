import styles from "./SubmitCaseThirdStep.module.css";
import YesNoCustomSlider from "@Components/CustomSlider/YesNoCustomSlider";
import MultiOptionCustomSlider from "@Components/CustomSlider/MultiOptionCustomSlider";
import { useEffect, useState } from "react";

function SubmitCaseThirdStep({patientInfo, info, reportInfo, uniqueCaseImages}) {
    const occlusal = ["crowding", "normal", "spacing"];
    const intraoralLateralMolar = ["c_1_m", "c_2_m", "c_3_m"];
    const intraoralLateralCanine = ["c_1_c", "c_2_c", "c_3_c"];
    const intraoralFrontal = ["shifted_left", "aligned", "shifted_right", "obstructed"];
    const treatmentApproach = ["esthetic", "comprehensive"];
    const treatmentArch = ["upper", "lower", "both"];
    const [reportInfoImageSrc, setReportInfoImageSrc] = useState({});
    
    const [maximizeImage, setMaximizeImage] = useState({
        maximizeImage: false,
        src: null,
    });
    const date = new Date();

    const newReportInfo = {...reportInfo};
    newReportInfo["occlusal_upper"] = occlusal.indexOf(reportInfo["occlusal_upper"]?.class);
    newReportInfo["occlusal_lower"] = occlusal.indexOf(reportInfo["occlusal_lower"]?.class);
    newReportInfo["intraoral_lateral_rt_molar_classification"] = intraoralLateralMolar.indexOf(reportInfo["intraoral_lateral_rt_molar_classification"]?.class);
    newReportInfo["intraoral_lateral_rt_canine_classification"] = intraoralLateralCanine.indexOf(reportInfo["intraoral_lateral_rt_canine_classification"]?.class);
    newReportInfo["intraoral_lateral_lt_molar_classification"] = intraoralLateralMolar.indexOf(reportInfo["intraoral_lateral_lt_molar_classification"]?.class);
    newReportInfo["intraoral_lateral_lt_canine_classification"] = intraoralLateralCanine.indexOf(reportInfo["intraoral_lateral_lt_canine_classification"]?.class);
    newReportInfo["intraoral_frontal"] = intraoralFrontal.indexOf(reportInfo["intraoral_frontal"]?.class);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    function handleMaximizeImage(e) {
            setMaximizeImage({maximizeImage:true, src:e.target.src})
    }
    useEffect(() => {
        setReportInfoImageSrc({
            "occlusal_upper": uniqueCaseImages["occlusal_upper"]?.src,
            "occlusal_lower": uniqueCaseImages["occlusal_lower"]?.src,
            "intraoral_lateral_rt": uniqueCaseImages["intraoral_lateral_rt"]?.src,
            "intraoral_lateral_lt": uniqueCaseImages["intraoral_lateral_lt"]?.src,
            "intraoral_frontal": uniqueCaseImages["intraoral_frontal"]?.src,
        })
    }, [])
    return <section className={styles.SubmitCaseThirdStep}>
            <section className={styles.prescription}>
                <ul>
                    <li>Patient Name: {patientInfo?.name}</li>
                    <li>Patient Gender: {patientInfo?.gender}</li>
                    <li>Patient Date Of Birth: {patientInfo?.dateOfBirth}</li>
                    <li>Current Date: {`${date.getMonth() + 1}/${date.getDay()}/${date.getFullYear()}`}</li>
                    <li>Treatment approach: {treatmentApproach[patientInfo?.treatmentApproach]}</li>
                    <li>Treatment arch: {treatmentArch[patientInfo?.treatmentArch]}</li>
                    <li>Chef Complaint: {patientInfo?.chiefComplaint}</li>
                </ul>
            </section>
            <section>
                <h2>Current situation reported detections</h2>
                <section className={styles.DiagnoseData}>
                    <section className={styles.DiagnoseInfo}>
                            <h3>Molar classification</h3>
                            <MultiOptionCustomSlider 
                            title={"Left Side"} 
                            value={newReportInfo["intraoral_lateral_lt_molar_classification"]}
                            type={"Molar"}
                            marks={[
                                {
                                value: 0,
                                label: 'CI',
                                },
                                {
                                value: 1,
                                label: 'CII',
                                },
                                {
                                value: 2,
                                label: 'CIII',
                                },
                            ]}
                            />
                            <MultiOptionCustomSlider 
                            title={"Right Side"} 
                            type={"Molar"} 
                            value={newReportInfo["intraoral_lateral_rt_molar_classification"]}
                            marks={[
                                {
                                value: 0,
                                label: 'CI',
                                },
                                {
                                value: 1,
                                label: 'CII',
                                },
                                {
                                value: 2,
                                label: 'CIII',
                                },
                            ]}
                            />
                            <MultiOptionCustomSlider 
                            type={"Canine"} 
                            value={newReportInfo["intraoral_lateral_lt_canine_classification"]}
                            marks={[
                                {
                                value: 0,
                                label: 'CI',
                                },
                                {
                                value: 1,
                                label: 'CII',
                                },
                                {
                                value: 2,
                                label: 'CIII',
                                },
                            ]}
                            className={styles.YesNoCustomSlider}
                            />
                            <MultiOptionCustomSlider 
                            type={"Canine"} 
                            value={newReportInfo["intraoral_lateral_rt_canine_classification"]}
                            marks={[
                                {
                                value: 0,
                                label: 'CI',
                                },
                                {
                                value: 1,
                                label: 'CII',
                                },
                                {
                                value: 2,
                                label: 'CIII',
                                },
                            ]}
                            />
                    </section>
                    <div className={styles.imagesContainer}>
                        <div className={styles.imageContainer}>
                            <img src={reportInfoImageSrc["occlusal_lower"]} alt="" onClick={handleMaximizeImage}/>
                        </div>
                        <div className={styles.imageContainer}>
                            <img src={reportInfoImageSrc["occlusal_upper"]} alt="" onClick={handleMaximizeImage}/>
                        </div>
                    </div>
                    <section className={styles.DiagnoseInfo}>
                            <h3>Anterior Space analysis</h3>
                            <MultiOptionCustomSlider 
                            title={"Upper arch"}
                            value={newReportInfo["occlusal_upper"]}
                            marks={[
                                {
                                    value: 0,
                                    label: 'Crowding',
                                    },
                                    {
                                    value: 1,
                                    label: 'aligned',
                                    },
                                    {
                                    value: 2,
                                    label: 'spacing',
                                    },
                            ]}
                            />
                            <MultiOptionCustomSlider 
                            title={"Lower arch"}
                            value={newReportInfo["occlusal_lower"]}
                            marks={[
                                {
                                    value: 0,
                                    label: 'Crowding',
                                    },
                                    {
                                    value: 1,
                                    label: 'aligned',
                                    },
                                    {
                                    value: 2,
                                    label: 'spacing',
                                    },
                            ]}
                            />
                    </section>
                    <div className={styles.imagesContainer}>
                        <div className={styles.imageContainer}>
                            <img src={reportInfoImageSrc["intraoral_lateral_rt"]} alt="" onClick={handleMaximizeImage}/>
                        </div>
                        <div className={styles.imageContainer}>
                            <img src={reportInfoImageSrc["intraoral_lateral_lt"]} alt="" onClick={handleMaximizeImage}/>
                        </div>
                    </div>
                    <section className={styles.DiagnoseInfo}>
                            <h3>Dental midline alignment</h3>
                            <MultiOptionCustomSlider 
                            type={"Lower midline"}
                            value={newReportInfo["intraoral_frontal"]}
                            marks={[
                                {
                                    value: 0,
                                    label: 'shifted left',
                                    },
                                    {
                                    value: 1,
                                    label: 'aligned',
                                    },
                                    {
                                    value: 2,
                                    label: 'shifted right',
                                    },
                                    {
                                    value: 3,
                                    label: 'obstructed',
                                    },
                            ]}
                            style={{gridColumn:"1/ -1", justifyContent:"space-evenly"}}
                            />
                    </section>
                    <div className={styles.imagesContainer}>
                        <div className={styles.imageContainer} style={{gridColumn: "1/ -1"}}>
                            <img src={reportInfoImageSrc["intraoral_frontal"]} alt="" onClick={handleMaximizeImage}/>
                        </div>
                    </div>
                </section>
            </section>
            <section className={styles.Instructions}>
                <h2>Preferences and instructions</h2>
                    <YesNoCustomSlider value={info["IPR"]} title={"IPR"} />
                    <YesNoCustomSlider title={"Attachments"} />
                    <YesNoCustomSlider title={"Posterior correction"} value={patientInfo.treatmentApproach == "Comprehensive"} />
            </section>
            <section className={styles.Instructions}>
                <YesNoCustomSlider title={"Expansion"} value={info["Expand"]}/>
                <YesNoCustomSlider title={"Proclination"} value={info["Procline"]}/>
                <YesNoCustomSlider title={"Extraction"}/>
                <YesNoCustomSlider title={"Distlization"} value={info["Distalize"]}/>
                <YesNoCustomSlider title={"Retraction"}/>
                <MultiOptionCustomSlider 
                            type={"Arch correction"}
                            marks={[
                                {
                                        value: 0,
                                        label: 'UPPER',
                                    },
                                    {
                                        value: 1,
                                        label: 'LOWER',
                                    },
                                    {
                                        value: 2,
                                        label:"BOTH"
                                    }
                            ]}
                            value={patientInfo.treatmentArch}
                            style={{margin:"30px auto"}}
                        />
            </section>
            <section style={{padding:"0% 6%"}}>
                <textarea name="" id="" style={{width:"100%", border:"2px solid #00B050"}} rows="5"></textarea>
            </section>
            {maximizeImage.maximizeImage ?
                <div className={styles.maximizeImage} onClick={()=> setMaximizeImage({maximizeImage:false, src:null})}>
                    <img src={maximizeImage.src} alt=""/>
                </div> : null}
        </section>
}

export default SubmitCaseThirdStep;

