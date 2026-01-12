import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from './loginvalidation';
import axios from "axios";


export default function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  
  const handleSubmit = (event) => {
  event.preventDefault();

  const validationErrors = Validation(values);
  setErrors(validationErrors);

  if (
    validationErrors.email === "" &&
    validationErrors.password === ""
  ) {
    axios.post("http://localhost:8081/login", values)
      .then(res => {
        if (res.data === "success") {
          navigate("/userlist");
        } else {
          alert("No record existed");
        }
      })
      .catch(err => console.error(err));
  }
};



  return (
    
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label htmlFor="email"><strong>Email</strong></label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={values.email}
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="password"><strong>Password</strong></label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={values.password}
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-0">
            <strong>Log In</strong>
          </button>

          <p className="mt-2">
            If you are a new user, first create your account
          </p>
          Don't have an account? <Link to="/signup">Signup</Link>

        </form>
      </div>
    </div>
  );
}
