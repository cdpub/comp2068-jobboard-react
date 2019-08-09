import React, {useEffect} from "react";  
import {Redirect} from "react-router-dom";
import Axios from "axios";

function Logout()   {
    
    //takes one argument, will execute when component mounts
    useEffect(() => {
        Axios.post(`/api/logout`);
    //the empty array will cause the callback to execute when the component mounts             
    }, []);         

    return <Redirect to="/" />;
}

export default Logout;

