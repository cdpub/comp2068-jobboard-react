import React, {useEffect, useState} from "react";
import Axios from "axios";
import {Link} from "react-router-dom";

function Index()    {

    //destructuring
    const [jobs, setJobs] = useState([]);
    
    useEffect(() => {
        Axios.get("/api/jobs")
        .then(result => setJobs(result.data))
        .catch(err => console.error(err));
    }, []);

    return (
        <div className="container">
            <header>
                <h1>All Jobs</h1>
            </header>

            <div>
                <table className="table table-stripped">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Company</th>
                            <th>Position</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map(job => (
                            <tr key={job._id}>
                                <td><Link to={`/jobs/${job._id}`}>{job.title}</Link></td>
                                <td>{job.employer && job.employer.company}</td>
                                <td>{job.position}</td>
                                <td>{job.location}</td>
                                <td>{job.status}</td>
                                <td>
                                    <Link to={`/jobs/${job._id}/edit`}>Edit</Link> 
                                      |     
                                    <Link to={`/jobs/${job._id}/destroy`}>Delete</Link>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Index;
