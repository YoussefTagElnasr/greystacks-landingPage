import { useContext, useEffect, useState } from "react";
import styles from "./SignUp.module.css";
import Submit from "@Components/Button/Submit/Submit";
import { isAuthContext } from "@Context/IsAuthContext";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [signUpInfo, setSignUpInfo] = useState({});
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isUserValid, setIsUserValid] = useState(false);
    const { isAuth, setIsAuth } = useContext(isAuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuth) {
            navigate("/SubmitCase");
        }
    }, [isAuth, navigate])
    return (
        <form action="" className={styles.SignUp}>
                <label htmlFor="FirstName">
                    <h3>First Name</h3>
                    <input type="text" required placeholder="First Name" id="FirstName" value={signUpInfo.firstName} disabled={true} onChange={(e)=> {
                        setSignUpInfo((prev) => {
                            const newSignUpInfo = {...prev};
                            newSignUpInfo.firstName = e.target.value;
                            return newSignUpInfo;

                        })
                    }}/>
                </label>
                <label htmlFor="LastName">
                    <h3>Last Name</h3>
                    <input type="text" required placeholder="Last Name" id="LastName" value={signUpInfo.lastName} disabled={true} onChange={(e)=> {
                        setSignUpInfo((prev) => {
                            const newSignUpInfo = {...prev};
                            newSignUpInfo.lastName = e.target.value;
                            return newSignUpInfo;

                        })
                    }}/>
                </label>
                <label htmlFor="email">
                    <h3>Email</h3>
                    <input type="email" required placeholder="Email" id="email" value={signUpInfo.email} disabled={true} onChange={(e)=> {
                        setSignUpInfo((prev) => {
                            const newSignUpInfo = {...prev};
                            newSignUpInfo.email = e.target.value;
                            return newSignUpInfo;

                        })
                    }}/>
                </label>
                <label htmlFor="password">
                    <h3>Password</h3>
                    <input type="password" required placeholder="password" id="password" value={signUpInfo.password} disabled={true} onChange={(e)=> {
                        setSignUpInfo((prev) => {
                            const newSignUpInfo = {...prev};
                            newSignUpInfo.password = e.target.value;
                            return newSignUpInfo;

                        })
                    }}/>
                </label>
                <label htmlFor="passwordConfirmation">
                    <h3>Confirm Your Password</h3>
                    <input type="password" required placeholder="confirm your password" id="passwordConfirmation" disabled={true} onChange={(e)=> {
                        if(e.target.value == signUpInfo.password) {
                            setIsPasswordValid(true);
                        } else {
                            if(isPasswordValid) {
                                setIsPasswordValid(false);
                            }
                        }
                    }}/>
                </label>
                <label htmlFor="occupation">
                    <h3>Occupation</h3>
                    <input type="text" required placeholder="occupation" id="occupation" value={signUpInfo.occupation} disabled={true} onChange={(e)=> {
                        setSignUpInfo((prev) => {
                            const newSignUpInfo = {...prev};
                            newSignUpInfo.occupation = e.target.value;
                            return newSignUpInfo;

                        })
                    }}/>
                </label>
                <label htmlFor="organisation">
                    <h3>organisation</h3>
                    <select name="" id="organisation"  value={signUpInfo.organisation} disabled={true} onChange={(e)=> {
                        setSignUpInfo((prev) => {
                            const newSignUpInfo = {...prev};
                            newSignUpInfo.organisation = e.target.value;
                            return newSignUpInfo;

                        })
                    }}>
                        <option value="" selected disabled hidden>Select an option</option>
                        <option value="clinic">clinic</option>
                        <option value="company">company</option>
                        <option value="other">other</option>
                    </select>
                </label>
                <label htmlFor="organisationName" >
                    <h3>Organisation Name</h3>
                    <input type="text" required placeholder="organisation Name" id="organisationName" disabled={true} value={signUpInfo.organisationName} onChange={(e)=> {
                        setSignUpInfo((prev) => {
                            const newSignUpInfo = {...prev};
                            newSignUpInfo.organisationName = e.target.value;
                            return newSignUpInfo;
                        })
                    }}/>
                </label>
            <Submit onClick={(e) => {
                e.preventDefault();
                let formData = new FormData()
                formData.append('first_name', signUpInfo.firstName);
                formData.append('last_name', signUpInfo.lastName);
                formData.append('email', signUpInfo.email);
                formData.append('password', signUpInfo.password);
                formData.append('occupation', signUpInfo.occupation);
                formData.append('organisation_type', signUpInfo.organisation);
                formData.append('organisation_name', signUpInfo.organisationName);
                
                fetch('https://orthovisor.com/api/authentication/user_signup', {
                    method: 'POST',
                    body: formData,
                })
                .then((res) => {
                    if(res.status == 200) {
                        setIsAuth(true);
                    }
                    return res.json()
                })
                .then((data) => {
                })
                .catch((err) => console.log(err));
            }}
            disabled={!isUserValid}>Sign Up</Submit>
        </form>
    );
}

export default SignUp;