import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import Axios from "axios";

function New () {
    const [inputs, setInputs] = useState({});
    const [redirect, setRedirect] = useState(false);

    //bind an event listener
    function handleInputChange(event) {
        event.persist();
        const {name, value} = event.target;

        setInputs(inputs => {
            return {
                ...inputs,
                [name]: value
            };
        });
    }

    function handleSubmit(event)    {
        event.preventDefault();

        Axios.post("/api/jobs", {
            job: {
                title: inputs.title,
                position: inputs.position,
                location: inputs.location,
                status: inputs.status
            }
        })
            .then(resp => setRedirect(true))
            .catch(err => console.log(err));
    }

    if (redirect) return <Redirect to="/jobs" />;

    return (
        <div className="container">
            <header>
                <h1>Post A New Job</h1>
            </header>

            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input className="form-control" name="title" required onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Position</label>
                        <input className="form-control" name="position" required onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <input className="form-control" name="location" required onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <select className="form-control" name="status" required onChange={handleInputChange} >
                            <option value="ACTIVE">active</option>
                            <option value="DUE">due in 5days</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-dark" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );


}

export default New;
