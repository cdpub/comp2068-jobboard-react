import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom"; 
import Axios from "axios";

function Edit(props) {
    const [inputs, setInputs] = useState({});
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        Axios.get(`/api/jobs/${props.match.params.id}`)
        .then(result => setInputs(result.data))  //long version is -  title:result.data.title, position: result.data.position....
        .catch(err => console.error(err));
    }, [props]);

    function handleSubmit(event) {
        event.preventDefault();

        Axios.post(`/api/jobs/update`, {
            id: props.match.params.id,
            job: inputs
        })
            .then(resp => setRedirect(true))
            .catch(err => console.error(err));
    }

    function handleInputChange(event) {
        event.persist();

        const {name, value} = event.target;
        
        setInputs(inputs => {
            return{
                ...inputs,
                [name] : value
            };
        });
    }

    if (redirect) return <Redirect to="/jobs" />;

    return(
        <div className="container">
            <header>
                <h1>Edit Job Post</h1>
            </header>
            <div>
                <form action="/jobs" method="POST" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input className="form-control" name="title" required="required" onChange={handleInputChange} defaultValue={inputs.title} />
                    </div>

                    <div className="form-group">
                        <label>Position</label>
                        <textarea className="form-control" name="content" onChange={handleInputChange} value={inputs.position} />
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <textarea className="form-control" name="content" onChange={handleInputChange} value={inputs.location} />
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <select className="form-control" name="status" required="required" onChange={handleInputChange} defaultValue={inputs.status}>
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

export default Edit;
