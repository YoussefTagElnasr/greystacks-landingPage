import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "./Home";
import {isAuthContext} from '@Context/IsAuthContext';
import { useState } from "react";
function Router() {
    const [isAuth, setIsAuth] = useState(null);
    const router = createBrowserRouter([
        {
            path:"/",
            element:<App/>,
            children: [
                {
                    index:true,
                    element:<Home/>
                }
            ]
        },
    ])
    return (
        <>
            <isAuthContext.Provider value={{isAuth , setIsAuth}}>
                <RouterProvider router={router} />
            </isAuthContext.Provider>
        </>
    );
}

export default Router;