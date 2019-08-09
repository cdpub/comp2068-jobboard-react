import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import Axios from "axios";

function Register() {
    const [inputs, setInputs] = useState({});
    const [redirect, setRedirect] = useState(false);

    function handleInputChange(event) {
        event.persist();
        
        //destructuring
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

        Axios.post("/api/employers", {
            employer: {
                company: inputs.company,
                username: inputs.username,
                email: inputs.email,
                password: inputs.password,
                passwordConfirmation: inputs.passwordConfirmation
            }
        })
            .then(resp => setRedirect(true))
            .catch(err => console.log(err));
    }

    if (redirect) return <Redirect to="/login" />;

    return (

    <div className="container">
      <header>
        <h1>New Employer</h1>
      </header>
      <div>
        <form onSubmit={handleSubmit}>
                    
        <div className="form-group">
            <label>Company</label>
            <input
              className="form-control"
              name="company"
              required="required"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              className="form-control"
              name="username"
              required="required"
              onChange={handleInputChange}
            />
          </div>

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
            <label>Password Confirmation</label>
            <input
              className="form-control"
              name="passwordConfirmation"
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

export default Register;