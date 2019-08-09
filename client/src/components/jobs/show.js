import React, {useState, useEffect} from "react";
import Axios from "axios";

function Show(props) {
    const [job, setJob] = useState([]);
    
    useEffect(() => {
        Axios.get(`/api/jobs/${props.match.params.id}`)
        .then(result => {
            console.log(result);
            setJob(result.data);
        })
        .catch(err => console.error(err));
    }, [props]);

    return (
       <div className="container">
            <header>
               <h1>{job.title}</h1>
            </header>
            <div>{job.position}</div>
            <div>{job.location}</div>
            <div>{job.status}</div>
       </div>
    )
}

export default Show;
