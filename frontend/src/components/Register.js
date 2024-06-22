import React from 'react';
import './style/Auth.css';

function Register() {
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic đăng ký
  };

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <h2 className="auth-title">Register</h2>
        <form onSubmit={handleRegisterSubmit}>
          <div className="text-center mb-3">
            <p>Sign up with:</p>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-facebook-f"></i>
            </button>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-google"></i>
            </button>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-twitter"></i>
            </button>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-github"></i>
            </button>
          </div>
          <p className="text-center">or:</p>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="registerName">Name:</label>
            <input type="text" id="registerName" className="form-control" placeholder="Enter your name" />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="registerEmail">Email:</label>
            <input type="email" id="registerEmail" className="form-control" placeholder="Enter your email" />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="registerPassword">Password:</label>
            <input type="password" id="registerPassword" className="form-control" placeholder="Enter your password" />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="registerRepeatPassword">Repeat Password:</label>
            <input type="password" id="registerRepeatPassword" className="form-control" placeholder="Repeat your password" />
          </div>
          <div className="form-check d-flex justify-content-center mb-4">
            <input className="form-check-input me-2" type="checkbox" value="" id="registerCheck" defaultChecked aria-describedby="registerCheckHelpText" />
            <label className="form-check-label" htmlFor="registerCheck">
              I have read and agree to the terms
            </label>
          </div>
          <button type="submit" className="btn btn-primary btn-block mb-3">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
