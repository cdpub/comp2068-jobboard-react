import React, {useEffect, useContext} from "react";  
import {Redirect} from "react-router-dom";
import Axios from "axios";
import NotificationContext from "../notification_context";

function Logout()   {
    
    const {setNotification} = useContext(NotificationContext);

    useEffect(() => {
        Axios.post(`/api/logout`)
        .then(() => setNotification(notification => {
            return{
                ...notification,
                status: "success",
                message: "You are now logged-out."    
            }
        }))
        .catch(() => setNotification(notification =>    {
            return{
                ...notification,
                status: "danger",
                message: "Oppss.... problem logging-out."
            }
        }));
    }, []);         

    return <Redirect to="/" />;
}

export default Logout;

