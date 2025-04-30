import { createRef, useEffect, useRef, useState } from "react";
import CachedIcon from '@mui/icons-material/Cached';
import diagnosisClasses from "../../../Utilities/CaseSubmitUtilities/DiagnosisClasses/diagnosisClasses";
import styles from "./SubmitCaseSecondStep.module.css";
import { absolutePosition, changeImagePosition} from "../../../Utilities/CaseSubmitUtilities/stepTwo.utilities";
import CloseIcon from '@mui/icons-material/Close';
import DiagnoseCard from "@Components/DiagnoseCard/DiagnoseCard";
import { Alert, CircularProgress, Collapse, IconButton } from "@mui/material";
import handleFileInput from "../../../Utilities/CaseSubmitUtilities/stepTwo.utilities";
import UserData from "@Components/UserData/UserData";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import extraoralLateral from "../../../assets/DiagnoseCardSvgs/extraoral_lateral.svg";
import frontalRest from "../../../assets/DiagnoseCardSvgs/frontal_rest.svg";
// import frontalSmiling from "../../../assets/DiagnoseCardSvgs/frontal_smiling.svg";
import intraoralFrontal from "../../../assets/DiagnoseCardSvgs/intraoral_frontal.svg";
import intraoralLateralLeft from "../../../assets/DiagnoseCardSvgs/intraoral_lateral_left.svg";
import intraoralLateralRight from "../../../assets/DiagnoseCardSvgs/intraoral_lateral_right.svg";
import occlusalLower from "../../../assets/DiagnoseCardSvgs/occlusal_lower.svg";
import occlusalUpper from "../../../assets/DiagnoseCardSvgs/occlusal_upper.svg";
import { isEqual } from 'lodash';

const SubmitCaseSecondStep = ({error ,setError, setIsInfoPresent, setReportInfo, uniqueCaseImages, setUniqueCaseImages, setCaseImagesResponse, setPatientInfo, patientInfo, isInfoPresent, caseId, setCaseId}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showInfo, setShowInfo] = useState({});
    const [caseImages, setCaseImages] = useState({});

    const imagesPlaceHolderRef = useRef({});
    const fileInputImagesRef = useRef({});
    const diagnosisSvgs = [frontalRest, extraoralLateral, occlusalUpper, "opg", "lateral_ceph", 'frontalSmiling', intraoralFrontal, occlusalLower, intraoralLateralLeft, intraoralLateralRight];


    useEffect(() => {
    const newUniqueCaseImages = {...uniqueCaseImages};
        Object.keys(fileInputImagesRef.current).map((key) => {
            let refreshCounter = caseImages[fileInputImagesRef?.current[key]?.querySelector("img").alt]?.refreshCounter;
            let diagnosis = caseImages[fileInputImagesRef?.current[key]?.querySelector("img")?.alt]?.diagnosis && caseImages[fileInputImagesRef?.current[key]?.querySelector("img").alt].diagnosis;
            const diagnose = diagnosis && diagnosisClasses[diagnosis[refreshCounter]]?.mainClass;
            if(diagnose == undefined) {
                return;
            }
            setTimeout(() => {
                fileInputImagesRef.current[key].style.border = "3px dotted red";
            }, 1500);
            if(diagnose in newUniqueCaseImages) {
                return;
            }
            // if(!(Object.keys(diagnosisClasses).slice(0, 10).includes(diagnose)) && Object.keys(diagnosisClasses).includes(diagnose)) {
            //     diagnose = diagnosisClasses[diagnose].mainClass;
            //     isSubClass = true;
            // }
            newUniqueCaseImages[diagnose] = fileInputImagesRef?.current[key]?.querySelector("img").alt;
            let dimension = imagesPlaceHolderRef?.current[diagnose];
            dimension = absolutePosition(dimension);
            changeImagePosition(fileInputImagesRef.current[key], dimension, diagnose, uniqueCaseImages, setUniqueCaseImages, setCaseImages, refreshCounter);
        })
    }, [caseImages])

    useEffect(() => {
        const newUniqueCaseImage =  {...uniqueCaseImages};
        Object.keys(uniqueCaseImages).map((key) => {
            if(typeof uniqueCaseImages[key] == "string" && caseImages[uniqueCaseImages[key]]) {
                newUniqueCaseImage[key] = {...caseImages[uniqueCaseImages[key]]};
                newUniqueCaseImage[key].isUnique = true;
            }
        })

        if(!isEqual(newUniqueCaseImage, uniqueCaseImages)) {
            setUniqueCaseImages(newUniqueCaseImage);
        }
    }, [uniqueCaseImages, caseImages])
    useEffect(() => {
        const newCaseImages = {...caseImages};
        Object.keys(uniqueCaseImages).map((key) => {
            if(uniqueCaseImages[key].name && uniqueCaseImages[key].isUnique) {
                delete newCaseImages[uniqueCaseImages[key].name];
            }
        })
        setTimeout(() => {
            setCaseImages(newCaseImages);
        }, 2000);
    }, [uniqueCaseImages])



    const cursorStyle = {
        cursor: isLoading || isInfoPresent == false ? "not-allowed" : "pointer"
    };
    return (
        <>
            <form className={styles.SubmitCaseFirstPage}>
                <Collapse in={error.error} style={{position:"fixed", top:"0", left: "50%",translate:"-50% 0%"}}>
                <Alert action={<IconButton onClick={() => setError({error:false, message: ""})}><CloseIcon></CloseIcon></IconButton>}  variant="filled" severity="error">{error.message}</Alert>
                </Collapse>
                <div className={styles.InsertcaseImgContainer} >
                    {Object.keys(caseImages).map((key, index) => {
                        const image = caseImages[key];
                        return <div className={styles.imageContainer} key={key} ref={(el) => (fileInputImagesRef.current[index] = el)}>
                            <img
                            src={image.src}
                            alt={key}
                            className={styles.selectedImage}
                            />
                            <div className={styles.caseImageOptions}>
                                <h2>{image.diagnosis ? image?.diagnosis[image.refreshCounter]?.replace(/_/g, ' ') : null}</h2>
                                <DeleteOutlineIcon sx={{color:"#00b050", cursor: "pointer"}} onClick={() => {
                                    setCaseImages((prev) => {
                                        const newCaseImage = {...prev};
                                        delete newCaseImage[image.name];
                                        return newCaseImage;
                                            })
                                }}/>
                                <InfoOutlinedIcon sx={{color:"#00b050", cursor: "pointer"}} onClick={() => {
                                    let message = diagnosisClasses[image.diagnosis && image.diagnosis[image?.refreshCounter]]?.message;
                                    message == undefined ? message = "no findings availabe for this type of image, expect support in the future." : null;
                                    showInfo.showInfo ? setShowInfo({showInfo:false, message:""}): setShowInfo({showInfo:true, message})
                                }}/> 
                                {/* <CachedIcon sx={{color:"#00b050", cursor: "pointer"}} onClick={() => {
                                    setCaseImages((prev) => {
                                        const newCaseImage = {...prev};
                                        newCaseImage[image.name].refreshCounter == 0 ? newCaseImage[image.name].refreshCounter = 1 : newCaseImage[image.name].refreshCounter = 0;
                                        return newCaseImage;
                                    })
                            }}/> */}
                            </div>
                    </div>
                    })}
                    <div className={styles.insertPicsInput} >
                        <h4>Insert Pics</h4>
                        <label htmlFor="fileInput" className={styles.customFileUpload} style={cursorStyle} onClick={() => {
                                    if(!isInfoPresent) {
                                        if(Object.values(patientInfo).includes(null)) {
                                            Object.keys(patientInfo).map((key)=> {
                                                if(patientInfo[key] == null) {
                                                    setPatientInfo((prev) => {
                                                        const newPatientInfo = {...prev};
                                                        newPatientInfo[key] = undefined;
                                                        return newPatientInfo;
                                                    })
                                                }
                                            })
                                        }
                                        window.scrollTo({top: 0, behavior: "smooth"})
                                    }
                            }}>
                            +
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            className={styles.fileInput}
                            onChange={(e)=>  {
                                    handleFileInput(e, setCaseImages, fileInputImagesRef, imagesPlaceHolderRef, uniqueCaseImages, setUniqueCaseImages, setError, setIsLoading, caseId,  patientInfo, setCaseId, setCaseImagesResponse, setReportInfo);
                            }}
                            accept="image/*"
                            multiple
                            disabled={isLoading || isInfoPresent == false}
                        />
                    </div>
                    {isLoading ? <CircularProgress sx={{color:"#00b050"} }/> : null}
                </div>
            </form>
            <div className={styles.selectedImagesContainer}>
                {Object.keys(diagnosisClasses).slice(0, 10).map((diagnoseName, index) => {
                    return <DiagnoseCard 
                    uniqueCaseImages={uniqueCaseImages}
                    imagesPlaceHolderRef={imagesPlaceHolderRef}
                    backgroundImage={diagnosisSvgs[index]}
                    setReportInfo={setReportInfo}
                    key={diagnoseName} 
                    caseId={caseId}
                    handleFileInputChange={
                        (e)=> handleFileInput(e, setCaseImages, fileInputImagesRef, imagesPlaceHolderRef, uniqueCaseImages, setUniqueCaseImages, setError, setIsLoading, caseId,  patientInfo, setCaseId, setCaseImagesResponse, setReportInfo)
                    } 
                    diagnoseRef={
                        (el) => (imagesPlaceHolderRef.current[diagnoseName] = el)
                    } 
                    caseImage={uniqueCaseImages[diagnoseName]} 
                    setCaseImages={setCaseImages} 
                    setUniqueCaseImages={setUniqueCaseImages} />
                })}
            </div>
            {showInfo.showInfo ?
                <div className={styles.showImageInfo} onClick={()=> setShowInfo({showInfo:false, message:""})}>
                    <h3>{showInfo.message}</h3>
                </div> : null}
    </>
    );
};

export default SubmitCaseSecondStep;
