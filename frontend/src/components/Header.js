import React from 'react';
import { Link } from 'react-router-dom';
import './style/Header.css';

function Header({ user }) {
  return (
    <header>
      <div className="logo-container">
        <img src="images/icon/logo.jpg" alt="Logo" className="logo" />
        <h1>SportsInfo</h1>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/sports">Sports</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/guestbook">Guestbook</Link></li>
          {user ? (
            <>
              <li>Welcome, {user.username} ({user.role})</li>
              <li><button onClick={() => {
                localStorage.removeItem('token');
                window.location.reload();
              }}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
