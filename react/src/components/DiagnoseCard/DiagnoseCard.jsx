import styles from "./DiagnoseCard.module.css";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CachedIcon from '@mui/icons-material/Cached';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { useEffect, useRef, useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import diagnosisClasses from "../../Utilities/CaseSubmitUtilities/DiagnosisClasses/diagnosisClasses";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {getRegeneratedModelOutput} from "../../Api/utils/apiUtils";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { absolutePosition } from "../../Utilities/CaseSubmitUtilities/stepTwo.utilities";

const DiagnoseCard = ({backgroundImage, imagesPlaceHolderRef, handleFileInputChange, setReportInfo, diagnoseRef, caseImage = null, setCaseImages, uniqueCaseImages, setUniqueCaseImages, caseId }) => { // change the names of the vars
    const [diagnose, setDiagnose] = useState(null);
    const [isSubClass, setIsSubClass] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showMaximizedImage, setShowMaximizedImage] = useState(false);
    const imageContainer = useRef(null);
    const [reviewed, setReviewed] = useState({like:false, dislike:false});
    const imageRef = useRef(null);
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center center",
        backgroundSize: 'contain',
        backgroundRepeat: "no-repeat",
    };

    const changeImagePosition = (imgContainer, newPositionRef, isUnique, newDiagnose) => {
    const currentDimension = absolutePosition(imgContainer);
    const refreshCounter = caseImage?.refreshCounter == 0 ? 1 : 0;
        if(newPositionRef.found && isUnique && !(newDiagnose in uniqueCaseImages)) {
            imgContainer.style.position = 'absolute';
            imgContainer.querySelector("div").style.visibility = "hidden";
            imgContainer.style.width = `${currentDimension.width}px`;
            imgContainer.style.height = `${currentDimension.height}px`;
            imgContainer.style.top = `${currentDimension.top - 98}px`;
            imgContainer.style.left = `${currentDimension.left}px`;
            imgContainer.style.right = `${window.outerWidth - currentDimension.right}px`;
            imgContainer.offsetHeight;
            imgContainer.style.transition = 'width 1s ease-in-out, height 1s ease-in-out, top 1s ease-in-out, left 1s ease-in-out, right 1s ease-in-out, visibility 300ms ease-in-out';
            imgContainer.style.width = `${newPositionRef.width - 4}px`;
            imgContainer.style.height = `${newPositionRef.height - 4}px`;
            imgContainer.style.top = `${newPositionRef.top - 98}px`;
            imgContainer.style.left = `${newPositionRef.left + 2}px`;
            imgContainer.style.right = `${window.outerWidth - newPositionRef.right}px`;
            imgContainer.style.zIndex = 2;
        } else {
            setCaseImages((prev) => {
                const newCaseImages = {...prev};
                newCaseImages[caseImage.name] = caseImage;
                newCaseImages[caseImage.name].isUnique = false;
                newCaseImages[caseImage.name].refreshCounter = refreshCounter;
                return newCaseImages;
            })
        }
    }


    const handleDelete = () => {
        setUniqueCaseImages((prev) => {
            const newUniqueCaseImage = {...prev};
            let newDiagnose = diagnosisClasses[caseImage.diagnosis[caseImage?.refreshCounter]]?.mainClass;
            delete newUniqueCaseImage[newDiagnose];
            return newUniqueCaseImage;
        })
        setCaseImages((prev) => {
            const newCaseImage = {...prev};
            newCaseImage[caseImage.name] ? newCaseImage[caseImage.name].isUnique = true : null;
            return newCaseImage;
        })
    }

    const handleFeedback = (feedBack) => {
        const formData = new FormData();
        formData.append('review', feedBack);
        fetch('https://orthovisor.com/api/feedback/submit_image_feedback', {
            method: 'POST',
            body: formData,
        })
        .then((res) => res.json())
        .then((data) => {
        })
        .catch((err) => console.log(err));
    }

    useEffect(() => {
        setShowOptions(false);
        setTimeout(() => {
            setShowOptions(true);
        }, 1100);
    }, [caseImage])

    useEffect(() => {
        let newDiagnose = caseImage && caseImage.diagnosis ? caseImage.diagnosis[caseImage?.refreshCounter] : null;
        if(newDiagnose && typeof newDiagnose === 'string') {
            newDiagnose = newDiagnose.replace(/_/g, ' ');
        }
        setDiagnose(newDiagnose);
    }, [caseImage]);
    useEffect(() => {
        if(!(Object.keys(diagnosisClasses).slice(0, 10).includes(caseImage?.diagnosis && caseImage.diagnosis[0])) && Object.keys(diagnosisClasses).includes(caseImage?.diagnosis && caseImage?.diagnosis[0])) {
            setIsSubClass(true);
        }
    }, [caseImage])
    return (
        <>
            <div className={styles.DiagnoseCard} ref={diagnoseRef} style={isSubClass ? {borderColor: "red", ...backgroundStyle} : {...backgroundStyle}}>
                {caseImage == null? 
                    <>
                    </>
                    :
                        <div className={styles.imageContainer} ref={imageContainer}>
                            <img
                                src={caseImage.src}
                                width={caseImage.width}
                                height={caseImage.height}
                                ref={imageRef}
                                style={{rotate: `-${caseImage?.rotated?.degree}deg`, transition: 'rotate 600ms ease-in-out 300ms'}}
                            />
                            <div className={styles.caseImageOptions} style={{display: showOptions == false ? "none" : "grid"}}>
                                {reviewed.like ? <ThumbUpAltIcon sx={{color:"#00b050", cursor: "pointer"}}/> : <ThumbUpOffAltIcon sx={{color:"#00b050", cursor: "pointer"}} onClick={() => {
                                    setReviewed({like:true, dislike:false})
                                    handleFeedback(JSON.stringify({[caseImage.id]: "True"}));
                                }}/>}
                                {/* <CachedIcon
                                    sx={isSubClass ? {color:"#00b050", cursor: "pointer"} : {color:"#00b050", cursor: caseImage?.refreshCounter >= 2 ? "no-drop" : "pointer", gridColumn: "3 / -1"}} onClick={() => {
                                        setShowOptions(false);
                                        let formData = new FormData();
                                        // let index = refreshCounter;
                                        const newDiagnose =  caseImage.diagnosis[ caseImage?.refreshCounter == 0 ? 1 : 0 ];
                                        let isUnique = false;

                                        const prevDiagnose = diagnose.replace(/ /g, '_');

                                        // if(caseImage?.diagnosis?.length == index + 1) {
                                        //     index = 0;
                                        // } else {
                                        //     index = index + 1;
                                        // }

                                        formData.append(caseImage.name, caseImage.imageSrc);
                                        formData.append("case_id", caseId);
                                        formData.append("image_id", caseImage.id);
                                        formData.append("prediction_chooser", newDiagnose)

                                        let dimension = imagesPlaceHolderRef?.current[newDiagnose];
                                        dimension = absolutePosition(dimension);
                                        if(!(newDiagnose in uniqueCaseImages)) {
                                            isUnique = true;
                                        }

                                        if(diagnosisClasses[newDiagnose]?.mainClass == undefined) {
                                            setCaseImages((prev) => {
                                                const newCaseImages = {...prev};
                                                delete newCaseImages[caseImage.name];
                                                return newCaseImages;
                                            })
                                            setCaseImages((prev) => {
                                                const newCaseImages = {...prev};
                                                newCaseImages[caseImage.name] = caseImage;
                                                newCaseImages[caseImage.name].refreshCounter = caseImage.refreshCounter == 0 ? 1 : 0;
                                                return newCaseImages;
                                            })
                                            setUniqueCaseImages((prev) => {
                                                const newUniqueCaseImages = {...prev};
                                                delete newUniqueCaseImages[prevDiagnose];
                                                return newUniqueCaseImages;
                                                
                                            })
                                            setTimeout(() => {
                                                setShowOptions(true);
                                            }, 1100);
                                            return;
                                        }
                                        changeImagePosition(imageContainer.current, dimension, isUnique, newDiagnose);

                                        setTimeout(() => {
                                            setUniqueCaseImages((prev) => {
                                                const newUniqueCaseImages = {...prev};
                                                delete newUniqueCaseImages[diagnosisClasses[prevDiagnose]?.mainClass];
                                                if(!(diagnosisClasses[newDiagnose].mainClass in newUniqueCaseImages)) {
                                                    newUniqueCaseImages[diagnosisClasses[newDiagnose]?.mainClass] = caseImage;
                                                } // has bug here we need to delete the image from the whole component
                                                newUniqueCaseImages[diagnosisClasses[newDiagnose]?.mainClass].refreshCounter = caseImage?.refreshCounter == 0 ? 1 : 0;
                                                // handleDelete();
                                                return newUniqueCaseImages;
                                            })
                                            setShowOptions(true);
                                        }, 1100);

                                        getRegeneratedModelOutput(formData).then((data)=> {
                                            setReportInfo((prev) => {
                                                const newReportInfo = {...prev};
                                                delete newReportInfo[caseImage?.diagnosis[caseImage?.refreshCounter]];
                                                if(data[caseImage.name].length <= 0) {
                                                    if(newReportInfo[caseImage?.diagnosis[caseImage?.refreshCounter + 1]]) {
                                                        newReportInfo[caseImage?.diagnosis[caseImage?.refreshCounter + 1]] = null;
                                                    }
                                                } else {
                                                    newReportInfo[newDiagnose] = {class: data[caseImage.name][0].output[0]};
                                                }
                                                return newReportInfo;
                                            })
                                        })
                                    }}
                                    /> */}
                                {isSubClass? <InfoOutlinedIcon sx={{color:"#00b050", cursor: "pointer"}} onClick={() => showInfo ? setShowInfo(false) : setShowInfo(true)}/> : null}
                                <h2 style={{fontSize: showInfo ? "1rem" : null}}>{showInfo ? diagnosisClasses[diagnose?.replace(/ /g, '_')]?.message : diagnose}</h2>
                                {reviewed.dislike ? <ThumbDownAltIcon sx={{color:"red", cursor: "pointer"}}/> : <ThumbDownOffAltIcon sx={{color:"red", cursor: "pointer"}} onClick={() => {

                                    setReviewed({like:false, dislike:true})
                                    handleFeedback(JSON.stringify({[caseImage.id]: "False"}));
                                }}/>}
                                <DeleteOutlineIcon sx={{color:"#00b050", cursor: "pointer"}} onClick={handleDelete}/>
                                <ZoomInIcon sx={{color:"#00b050", cursor: "pointer"}} onClick={() => setShowMaximizedImage(true)}/>
                            </div>
                        </div>
                }
            </div>
            {caseImage == null? null 
            : 
                <div 
                    className={styles.maximize}
                    style={showMaximizedImage ? {display: "block"} : {display: "none"}}
                    onClick={() => setShowMaximizedImage(false)}
                >
                    <img
                        src={caseImage.src}
                        ref={imageRef}
                    />
                </div>
            }
        </>
    );
};

export default DiagnoseCard;