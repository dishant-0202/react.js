import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './signupvalidation';
import axios from 'axios';

export default function Signup() {
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    role: '',
    phoneno: '',
    address: '',
    password: '',
    cpassword: ''
  });

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
    validationErrors.firstname === "" &&
    validationErrors.lastname === "" &&
    validationErrors.email === "" &&
    validationErrors.role === "" &&
    validationErrors.phoneno === "" &&
    validationErrors.address === "" &&
    validationErrors.password === "" &&
    validationErrors.cpassword === ""
  ) {
    axios
      .post("http://localhost:8081/signup", values)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  }
};



  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className="bg-white p-3 rounded w-25">
        <h2>Signup</h2>

        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label><strong>First Name</strong></label>
            <input type="text" name="firstname" onChange={handleInput} className="form-control rounded-0" />
            {errors.firstname && <span className="text-danger">{errors.firstname}</span>}
          </div>

          <div className='mb-3'>
            <label><strong>Last Name</strong></label>
            <input type="text" name="lastname" onChange={handleInput} className="form-control rounded-0" />
            {errors.lastname && <span className="text-danger">{errors.lastname}</span>}
          </div>

          <div className='mb-3'>
            <label><strong>Email</strong></label>
            <input type="email" name="email" onChange={handleInput} className="form-control rounded-0" />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>

          <div className='mb-3'>
            <label><strong>Role</strong></label>
            <select name="role" onChange={handleInput} className="form-control rounded-0">
              <option value="">Select role</option>
              <option value="user">User</option>
              <option value="manager">Manager</option>
            </select>
            {errors.role && <span className="text-danger">{errors.role}</span>}
          </div>

          <div className='mb-3'>
            <label><strong>Phone No</strong></label>
            <input type="tel" name="phoneno" onChange={handleInput} className="form-control rounded-0" />
            {errors.phoneno && <span className="text-danger">{errors.phoneno}</span>}
          </div>

          <div className='mb-3'>
            <label><strong>Address</strong></label>
            <input type="text" name="address" onChange={handleInput} className="form-control rounded-0" />
            {errors.address && <span className="text-danger">{errors.address}</span>}
          </div>

          <div className='mb-3'>
            <label><strong>Password</strong></label>
            <input type="password" name="password" onChange={handleInput} className="form-control rounded-0" />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>

          <div className='mb-3'>
            <label><strong>Confirm Password</strong></label>
            <input type="password" name="cpassword" onChange={handleInput} className="form-control rounded-0" />
            {errors.cpassword && <span className="text-danger">{errors.cpassword}</span>}
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-0">
            Signup
          </button>

          <p className="mt-2">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
