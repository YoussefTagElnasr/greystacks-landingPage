import { TabContext, TabList, TabPanel } from "@mui/lab";
import logo from "@Assets/logo.svg";
import styles from "./RequestADemo.module.css";
import { Alert, Box, Collapse, IconButton, Tab } from "@mui/material";
import { useState } from "react";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

const RequestADemo = () => {
    const [value, setValue] = useState('Sign In');
    const [signUp, setSignUp] = useState(false);
    const [error, setError] = useState({error:false, message:""});
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Collapse in={signUp} style={{position:"fixed", top:"0", left: "50%",translate:"-50% 0%"}}>
                <Alert action={<IconButton onClick={() => setSignUp(false)}><CloseIcon></CloseIcon></IconButton>}  variant="filled" severity={"info"}>{<p><Link to={"/ContactUs"} style={{textDecoration:"none", backgroundColor:"#00b050", color:"white", padding:"2px 4px"}}>Contact us</Link> if you wish to request a Demo.</p>}</Alert>
            </Collapse>
            <Collapse in={error.error} style={{position:"fixed", top:"0", left: "50%",translate:"-50% 0%"}}>
                <Alert action={<IconButton onClick={() => setError(false)}><CloseIcon></CloseIcon></IconButton>}  variant="filled" severity={"error"}>{error.message}</Alert>
            </Collapse>
            <section className={styles.RequestADemo}>
                <img src={logo}  />
                <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="sign in form">
                    <Tab label="Sign In" value="Sign In" sx={{margin:"0", width: "50%"}}/>
                    <Tab label="Sign Up" value="Sign Up" sx={{margin:"0", width: "50%"}} onClick={() => {
                        setError(false);
                        setSignUp(true);
                }}/>
                    </TabList>
                </Box>
                <TabPanel value="Sign In">
                    <SignIn setError={setError}/>
                </TabPanel>
                <TabPanel value="Sign Up" >
                    <SignUp/>
                </TabPanel>
                </TabContext>
            </section>
        </>
    );
};

export default RequestADemo;