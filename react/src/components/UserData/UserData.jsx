import styles from "./UserData.module.css";
import { useEffect } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const UserData = ({setIsInfoPresent, patientInfo ,setPatientInfo}) => { //we can use context here instead of state
    useEffect(() => {
        if(!patientInfo) {
            return;
        }
        const {name, gender, dateOfBirth, chiefComplaint, treatmentArch, treatmentApproach, caseId} = patientInfo ;
        if(name != null && gender != null && dateOfBirth != null && dateOfBirth?.errorMessage == null && chiefComplaint != null && treatmentArch != null && treatmentApproach != null) {
            if(caseId == null || caseId == undefined) {
                setPatientInfo((prev) => {
                    const newPatientInfo = {...prev};
                    newPatientInfo.caseId = "N/A";
                    return newPatientInfo;
                })
            }
            setIsInfoPresent(true);
        }
    }, [patientInfo])
    const handleInputChange = (value, inputName) => {
        setPatientInfo((prev) => {
            const newPatientInfo = {...prev};
            newPatientInfo[inputName] = value;
            return newPatientInfo;
        })
    }
    return (
        <div className={styles.UserData}>
            <form className={styles.SubmitCaseFirstStep}>
                <label htmlFor="Name">
                    <h4>Patient Name <span>*</span></h4> 
                    <input type="text" id="name" placeholder="Patient Name..." 
                    onChange={e => handleInputChange(e.target.value, "name")} 
                    value={patientInfo?.name}/>
                    {patientInfo?.name === undefined ? <p style={{color: "red", gridColumn:"1 / -1"}}>Field is Required</p> : null}

                </label>
                <label htmlFor="Gender" >
                    <h4 >Gender <span>*</span></h4> 
                    <select name="Gender"  onChange={e => handleInputChange(e.target.value, "gender")} value={patientInfo?.gender}>
                    <option value="" selected disabled hidden>Select an option</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {patientInfo?.gender === undefined ? <p style={{color: "red", gridColumn:"1 / -1"}}>Field is Required</p> : null}
                </label>
                <label htmlFor="DateOfBirth">
                    <h4>Date Of Birth<span>*</span></h4> 
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']} sx={{gridColumn:" 1 / -1"}} >
                            <DatePicker sx={{color:"white", width:"100%"}} label="Date Of Birth"  className={styles.customDatePicker} onChange={e =>{
                                const date = new Date();
                                const inputDate = new Date(e["$y"], e["$M"], e["$D"])
                                if(date < inputDate) {
                                    setIsInfoPresent(false);
                                    setPatientInfo((prev) => {
                                        const newPatientInfo = {...prev};
                                        newPatientInfo["dateOfBirth"] = {errorMessage: "please pick a correct date"};
                                        return newPatientInfo;
                                    })
                                    return;
                                }
                                setPatientInfo((prev) => {
                                    const newPatientInfo = {...prev};
                                    newPatientInfo["dateOfBirth"] = `${e["$M"] + 1}/${e["$D"]}/${e["$y"]}`;
                                    return newPatientInfo;
                                })
                            }}/>
                        </DemoContainer>
                    </LocalizationProvider>
                    {patientInfo?.dateOfBirth?.errorMessage ? <p style={{color: "red", gridColumn:"1 / -1"}}>{patientInfo.dateOfBirth.errorMessage ? patientInfo.dateOfBirth.errorMessage : "Field is Required"}</p>  : null}

                </label>
                <label htmlFor="CaseId" >
                    <h4 >Case Id <span className={styles.optional} >(optional)</span></h4> 
                    <input type="text" style={{height:"55px", marginTop:"9px"}} id="CaseId" onChange={e => handleInputChange(e.target.value, "caseId")}  />

                </label>
                <label htmlFor="treatmentApproach">
                    <h4>treatment approach <span>*</span></h4> 
                    <select name="treatmentApproach" onChange={e => handleInputChange(e.target.value, "treatmentApproach")} value={patientInfo?.treatmentApproach}>
                        <option value="" selected disabled hidden>Select an option</option>
                        <option value="0" >esthetic</option>
                        <option value="1">Comprehensive</option>
                    </select>
                    {patientInfo?.treatmentApproach === undefined ? <p style={{color: "red", gridColumn:"1 / -1"}}>Field is Required</p> : null}

                </label>
                <label htmlFor="treatmentArch"  >
                    <h4 >treatment arch <span>*</span></h4> 
                    <select name="treatmentArch" onChange={e => handleInputChange(e.target.value, "treatmentArch")} value={patientInfo?.treatmentArch} >
                        <option value="" selected disabled hidden>Select an option</option>
                        <option value="0">UPPER</option>
                        <option value="1">LOWER</option>
                        <option value="2">BOTH</option>
                    </select>
                    {patientInfo?.treatmentArch === undefined ? <p style={{color: "red", gridColumn:"1 / -1"}}>Field is Required</p>  : null}
                </label>
                <label htmlFor="ChiefComplaint">
                    <h4>Chief Complaint <span>*</span></h4> 
                    <textarea type="text" id="ChiefComplaint" rows="5" onChange={e => handleInputChange(e.target.value, "chiefComplaint")} value={patientInfo?.chiefComplaint} />
                    {patientInfo?.chiefComplaint === undefined ? <p style={{color: "red", gridColumn:"1 / -1"}}>Field is Required</p> : null}
                </label>
            </form>
        </div>
    );
};

export default UserData;