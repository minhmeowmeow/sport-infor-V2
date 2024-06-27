import React, {useState} from 'react';
import './style/Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to login endpoint on your backend
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const userData = await response.json();

      if(userData === null || userData === undefined){
        alert('Login failed. Please check your credentials and try again.');
      }else{
        console.log(userData);
        const role = userData.role.name;
        const useremail = userData.email;
        
        // Store user data in localStorage (if needed)
        localStorage.setItem('userRole', JSON.stringify(role));
        localStorage.setItem('userEmail', JSON.stringify(useremail));
  
        // Redirect to dashboard or another page after successful login
        window.location.href = '/dashboard'; // Replace with your actual dashboard route
      }


    } catch (error) {
      console.error('Login error:', error.message);
      // Handle login error (show error message to user, etc.)
    }

  };

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <div className="text-center mb-3">
            <p>Sign in with:</p>
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
            <label className="form-label" htmlFor="loginEmail">Email:</label>
            <input 
              type="email" 
              id="loginEmail" 
              className="form-control" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />          
            </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="loginPassword">Password:</label>
            <input type="password" 
            id="loginPassword" 
            className="form-control" 
            placeholder="Enter your password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="row mb-4">
            <div className="col-md-6 d-flex justify-content-center">
              <div className="form-check mb-3 mb-md-0">
                <input className="form-check-input" type="checkbox" value="" id="loginCheck" defaultChecked />
                <label className="form-check-label" htmlFor="loginCheck"> Remember me </label>
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-center">
              <a href="#!" className="btn-link">Forgot password?</a>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
          <div className="text-center">
            <p>Not a member? <a href="/register" className="btn-link">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
