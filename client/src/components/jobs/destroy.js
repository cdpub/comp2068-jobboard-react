import React, {useEffect} from "react";  
import {Redirect} from "react-router-dom";
import Axios from "axios";

function Destroy(props)   {
    
    //takes one argument, will execute when component mounts
    useEffect(() => {
        Axios.post(`/api/jobs/destroy`, {
            id: props.match.params.id
        });
    }, [props]);         

    return <Redirect to="/jobs" />;
}

export default Destroy;