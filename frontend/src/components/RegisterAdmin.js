import React, {useState} from 'react';
import './style/Auth.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username: name,
      email: email,
      password: password,
      role: {
        id: 1,
        name: 'ROLE_ADMIN'
      }
    };

    try {
      if(userData.password != repeatPassword){
        throw new Error('Password Was Not The Same');
      }
      const role = localStorage.getItem('userRole').replace(/^"(.*)"$/, '$1');
      // Send POST request to your backend
      const response = await fetch('http://localhost:3000/users/newadmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userData: userData,
          role: role  
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('New admin user created:', data);

      // Handle successful registration (e.g., show success message, redirect user, etc.)
      alert('Registration successful!');

      // Clear form fields after successful registration
      setName('');
      setEmail('');
      setPassword('');
      setRepeatPassword('');

    } catch (error) {
      console.error('Error registering admin:', error.message);
      // Handle error (e.g., show error message to user)
      alert('Error registering admin. Please try again.');
    }
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
            <input 
              type="text" 
              id="registerName" 
              className="form-control" 
              placeholder="Enter your name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="registerEmail">Email:</label>
            <input 
              type="email" 
              id="registerEmail" 
              className="form-control" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="registerPassword">Password:</label>
            <input 
              type="password" 
              id="registerPassword" 
              className="form-control" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="registerRepeatPassword">Repeat Password:</label>
            <input 
              type="password" 
              id="registerRepeatPassword" 
              className="form-control" 
              placeholder="Repeat your password" 
              value={repeatPassword} 
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
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
