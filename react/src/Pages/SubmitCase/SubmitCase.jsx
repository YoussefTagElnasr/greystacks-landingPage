import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { useEffect, useState } from 'react';
import { CircularProgress, StepLabel } from '@mui/material';
import styles from "./SubmitCase.module.css"
import SubmitCaseSecondStep from './SecondStep/SubmitCaseSecondStep';
import SubmitCaseThirdStep from './ThirdStep/SubmitCaseThirdStep';
import UserData from '../../components/UserData/UserData';
import { getCookie } from '../../Api/utils/cookieUtils';

const steps = [
    'Insert Patient Info',
    'insert Clinical Images',
    'Generate / Edit Report',
];


const SubmitCase = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [caseId, setCaseId] = useState(null);
    const [isInfoPresent, setIsInfoPresent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [caseImagesResponse, setCaseImagesResponse] = useState(null);
    const [info, setInfo] = useState({});
    const [reportInfo, setReportInfo] = useState({});
    const [uniqueCaseImages, setUniqueCaseImages] = useState({});
    const [error, setError] = useState({});


    const [completed, setCompleted] = useState({});
    const [patientInfo, setPatientInfo] = useState({
        name: null,
        gender:null,
        dateOfBirth: null,
        chiefComplaint: null,
        treatmentArch: null,
        treatmentApproach: null,
        caseId:null,
    });
    const stepsComponents = [
    <UserData setIsInfoPresent={setIsInfoPresent} key={0} setPatientInfo={setPatientInfo} patientInfo={patientInfo}/>,
    <SubmitCaseSecondStep error={error} setError={setError} key={1} uniqueCaseImages={uniqueCaseImages} setUniqueCaseImages={setUniqueCaseImages} setCaseImagesResponse={setCaseImagesResponse} setCaseId={setCaseId} setIsInfoPresent={setIsInfoPresent} caseId={caseId} isInfoPresent={isInfoPresent} setPatientInfo={setPatientInfo} patientInfo={patientInfo} setReportInfo={setReportInfo}/>,

    <SubmitCaseThirdStep patientInfo={patientInfo} key={2} caseImagesResponse={caseImagesResponse} info={info} reportInfo={reportInfo} uniqueCaseImages={uniqueCaseImages} set  />]
    

    const totalSteps = steps.length;
    const completedSteps = Object.keys(completed).length;
    const allStepsCompleted = completedSteps === totalSteps;


    useEffect(() => {
        const handleRefresh = (e) => {
            e.preventDefault();
        };

        window.addEventListener("beforeunload", handleRefresh);
            return () => {
                window.removeEventListener("beforeunload", handleRefresh);
            };
    }, []);

    const handleBack = () => {
        const newCompleted = {...completed};
        delete newCompleted[activeStep - 1];
        setCompleted(newCompleted);
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const handleFirstStepNext = (newCompleted) => {
        let isInfoNotPresent = true;

        if(Object.values(patientInfo).includes(null)) {
            Object.keys(patientInfo).map((key)=> {
                if(patientInfo[key] == null) {
                    isInfoNotPresent = true;

                    setPatientInfo((prev) => {
                        const newPatientInfo = {...prev};
                        newPatientInfo[key] = undefined;
                        return newPatientInfo;
                    })
                }
            })
        } else if (!Object.values(patientInfo).includes(undefined) && !Object.values(patientInfo).includes(null)) {
            isInfoNotPresent = false;
        }

        if(isInfoNotPresent) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            return;
        }

        const treatmentApproach = ["esthetic", "Comprehensive"];
        const treatmentArch = ["UPPER", "LOWER", "BOTH"];

        let headers = {}
        if (getCookie('csrftoken'))
        {
            headers['X-CSRFToken'] = getCookie('csrftoken');
        }

        setIsLoading(true);

        let formData = new FormData();
        formData.append("patient_name", patientInfo.name);
        formData.append("date_of_birth", patientInfo.dateOfBirth);
        formData.append("patient_gender", patientInfo.gender);
        formData.append("treatment_approach", treatmentApproach[patientInfo.treatmentApproach]);
        formData.append("treatment_arch", treatmentArch[patientInfo.treatmentArch]);
        formData.append("chief_complaint", patientInfo.chiefComplaint);

        fetch('https://orthovisor.com/api/machine_learning/create_case', {
            method: 'POST',
            headers: headers,
            body: formData,
        })
        .then((res) => res.json())
        .then((data) => {
            setCaseId(data.case_id);
            setIsLoading(false);
            setActiveStep(activeStep + 1);
            setCompleted(newCompleted);

        })
        .catch((err) => console.log(err));

    }

    const handleSecondStepNext = (newCompleted) => {
        if(Object.keys(uniqueCaseImages).length <= 0) {
            setError({error:true, message: "please insert at least one image"});
            return;
        }

        let treatmentOptionData = new FormData();
        treatmentOptionData.append("diagnoses", JSON.stringify(caseImagesResponse))
        fetch('https://orthovisor.com/api/machine_learning/treatment_options', {
            method: 'POST',
            body: treatmentOptionData,
        })
        .then((res) => res.json())
        .then((data) => {
            setInfo(() => {
                const newInfo = {...data};
                newInfo['Bite Ramps'] == "yes" ? newInfo['Bite Ramps'] = 1 : newInfo['Bite Ramps'] = 0;
                newInfo['Cutouts for elastics'] == "yes" ? newInfo['Cutouts for elastics'] = 1 : newInfo['Cutouts for elastics'] = 0;
                newInfo['Engagers'] == "yes" ? newInfo['Engagers'] = 1 : newInfo['Engagers'] = 0;
                newInfo['Distalize'] == "yes" ? newInfo['Distalize'] = 1 : newInfo['Distalize'] = 0;
                newInfo['Expand'] == "yes" ? newInfo['Expand'] = 1 : newInfo['Expand'] = 0;
                newInfo['Procline'] == "yes" ? newInfo['Procline'] = 1 : newInfo['Procline'] = 0;
                newInfo['IPR'] == "yes" ? newInfo['IPR'] = 1 : newInfo['IPR'] = 0;
                return newInfo;
            });
            setCompleted(newCompleted);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
        .catch((err) => console.log(err));
    }

    const handleNext = () => {
        const newCompleted = {...completed};
        newCompleted[activeStep] = true;

        switch(activeStep) {
            case 0:
                handleFirstStepNext(newCompleted);
                break;
            case 1:
                handleSecondStepNext(newCompleted);
                break;
            default:
                break;
        }

    };
    const printPage = () => {
        window.print();
    }

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };


    return (
        <section className={styles.SubmitCase}>
            {isLoading ? <CircularProgress sx={{color:"#00b050", position:"fixed", top:"90%", left:"95%", width:"60px", height:"60px"} }/> : null}
            <Stepper
                activeStep={activeStep}
                sx={{padding: "3% 0%", width: "80%", margin: "auto"}}
                className={styles.Stepper}
            >
                {steps.map((step, index) => (
                    <Step
                        key={step}
                        completed={completed[index]}
                    >
                        <StepLabel>{step}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <>
                {allStepsCompleted ? <button onClick={handleReset} style={{marginLeft: "auto"}}>Reset</button>
                    : (
                    <>
                        {stepsComponents[activeStep]}
                        <div className={styles.SubmitCaseControls}>
                            {
                                activeStep !== 0 ?
                                <button
                                className={styles.ControlButtons}
                                onClick={handleBack}
                                disabled={activeStep === 0}
                                
                            >
                                    Back
                                </button> : null
                            }
                            <button
                                className={styles.ControlButtons}
                                onClick={activeStep === totalSteps - 1 ? printPage : handleNext}
                                // disabled={isLoading}
                                style={{marginLeft: "auto"}}
                            >
                                {activeStep === totalSteps - 1 ? 'Export' : 'Next'}
                            </button>
                        </div>
                    </>
                )}
            </>
        </section>
        );
};

export default SubmitCase;