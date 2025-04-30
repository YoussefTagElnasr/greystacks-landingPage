import SubmitCase from "@Pages/SubmitCase/SubmitCase";
import { useContext } from 'react';
import { isAuthContext } from '@Context/IsAuthContext';
import { Navigate } from "react-router-dom";

const SubmitCasePage = () => {
    const { isAuth } = useContext(isAuthContext);
    return (
        isAuth == true ? <SubmitCase/> : <Navigate to={"/RequestADemo"}/>
    );
};

export default SubmitCasePage;