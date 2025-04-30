import styles from "./SignIn.module.css";
import Submit from "@Components/Button/Submit/Submit";
import { authenticateUser } from "@Api/userAuth";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthContext } from "@Context/IsAuthContext";

const SignIn = ({setError}) => {
    const [email, setEmail] = useState(""); //we need to change this to email
    const [password, setPassword] = useState("");
    const { isAuth, setIsAuth } = useContext(isAuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        let formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        e.preventDefault();
        fetch('https://orthovisor.com/api/authentication/user_login', {
            method: 'POST',
            body:formData,
        })
        .then((res) => {
            if(res.status == 200) {
                setIsAuth(true);
            }
            return res.json();
        })
        .then((data) => {
            if(data.status == "failure") {
                setError({error: true, message: data.reason});
            }
        })
        .catch((err) => console.log(err));
    }
    return (
        <form className={styles.SignIn} onSubmit={handleSubmit}>
            {isAuth === false ? <h3 style={{color:"red", marginTop: "10px"}}>username or password is wrong please try again</h3> 
            : isAuth === true ? <Navigate to={"/SubmitCase"} replace={true}/> : null}
            <label htmlFor="Email">
                <h3>Email</h3>
                <input type="text" required placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} id="Email"/> 
            </label>
            <label htmlFor="Password">
                <h3>Password</h3>
                <input type="password" required placeholder="password" onChange={(e) => {setPassword(e.target.value)}} id="Password"/>
            </label>
            <Submit>Sign In</Submit>
        </form>
    );
};

export default SignIn;