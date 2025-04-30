import { useEffect, useState } from "react";
import styles from "./ContactUs.module.css";
import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const sendContactUsFormData = async (formdata, setError) => {
}

const submitContactUs = async (event, setError, setFormInfo, formInfo) => {
    event.preventDefault();
    let eventtarget = event.target;
    if(formInfo.name == eventtarget[0].value && formInfo.email == eventtarget[1].value && formInfo.company == eventtarget[2].value && formInfo.features == eventtarget[3].value && formInfo.help == eventtarget[4].value) {
        setError({error:true, message: "Please change the input fields before submitting a new form.", severity: "error"})
        return;
    }
    setFormInfo({name:eventtarget[0].value, email: eventtarget[1].value, company: eventtarget[2].value, features: eventtarget[3].value, help: eventtarget[4].value});
    let contactusInfo = new FormData();
    contactusInfo.append('name', eventtarget[0].value);
    contactusInfo.append('email', eventtarget[1].value);
    contactusInfo.append('company', eventtarget[2].value);
    contactusInfo.append('features', eventtarget[3].value);
    contactusInfo.append('how_we_can_help', eventtarget[4].value);
    sendContactUsFormData(contactusInfo, setError);
}

const handleInputLength = (e, setError, max) => {
    const value = e.target.value;
    if (value.length > 0 && value.length < max) {
        e.target.style.borderColor = "#00b050";
        setError({error:false, message: "", color:"red"})
        return true;
    } else {
        e.target.style.borderColor = "red";
        setError({error:true, message: `The Input Must Have At Least 1 Charcter And Need To Be Less Than ${max} Charcter`, severity: "error"})
        return false;
    }
}

function ContactUs() {
    const [error, setError] = useState({error:false, message: "", severity: "error"});
    const [formInfo, setFormInfo] = useState({});
    return (
        <>
            <Collapse in={error.error} style={{position:"fixed", top:"0", left: "50%",translate:"-50% 0%"}}>
                <Alert action={<IconButton onClick={() => setError({error:false, message: "", severity:"error"})}><CloseIcon></CloseIcon></IconButton>}  variant="filled" severity={error.severity}>{error.message}</Alert>
            </Collapse>
            <form action="" onSubmit={event => {
                error.error ? event.preventDefault() : submitContactUs(event, setError, setFormInfo, formInfo)
                }} className={styles.ContactUs}>
                <h1>Feel Free To Send Us A Message</h1>
                <label htmlFor="Name">
                    <h3>Name</h3>
                    <input type="text" id="Name" required onBlur={(e) => {
                        const value = e.target.value;
                        const pattern = /\w*\d\w*/;
                        const isValid = handleInputLength(e, setError, 100);
                        if(!isValid) {
                            return;
                        }
                        if(pattern.test(value)) {
                            e.target.style.borderColor = "red";
                            setError({error:true, message: "Names Cant Contain a Number"})
                        } else if (!pattern.test(value) && isValid) {
                            e.target.style.borderColor = "#00b050";
                            setError({error:false, message: ""})
                        }
                    }}/>
                </label>
                <label htmlFor="Email">
                    <h3>Email Address</h3>
                    <input type="email" id="Email" required onBlur={(e) => handleInputLength(e, setError, 100)}/>
                </label>
                <label htmlFor="Company">
                    <h3>Company</h3>
                    <input type="text" id="Company" required onBlur={(e) => handleInputLength(e, setError, 100)}/>
                </label>
                <label htmlFor="Feature">
                    <h3>Features you&apos;re interested in</h3>
                    <select name="" id="Feature" required>
                        <option value="" selected disabled hidden>Select an option</option>
                        <option value="orthodontic image analysis">orthodontic image analysis</option>
                        <option value="orthodontic chat models">orthodontic chat models</option>
                    </select>
                </label>
                <label htmlFor="Help">
                    <h3>How Can We Help You</h3>
                    <textarea name="" id="Help"  rows="5" required onBlur={(e) => handleInputLength(e, setError, 500)}></textarea>
                </label>
                <button type="submit" disabled={error.error}>Submit</button>
            </form>
        </>

    );
}



export default ContactUs;