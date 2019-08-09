import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import Axios from "axios";

function Login() {
    const [inputs, setInputs] = useState({});
    const [redirect, setRedirect] = useState(false);

    function handleInputChange(event) {
        event.persist();
        const {name, value} = event.target;

        setInputs(inputs => {
            return {...inputs, [name]: value };
        });
    }
    
    function handleSubmit(event)    {
        event.preventDefault();

        Axios.post("api/authenticate", {
            email: inputs.email,
            password: inputs.password
        })

        .then (() => {
            //setInputs({});  //clear inputs by resetting inputs to empty object
            setRedirect(true);
        })    
        .catch(err => console.error(err));
    }

    if (redirect) return <Redirect to="/jobs" />;

    return (
        <div className="container">
            <header>
                <h1>Login</h1>
            </header>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            className="form-control"
                            name="email"
                            required="required"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            className="form-control"
                            name="password"
                            type="password"
                            required="required"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-dark" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;