import React from 'react';
import { Link } from 'react-router-dom';
import './style/Header.css';

function Header({ user }) {
  return (
    <header>
      <h1>SportsInfo</h1>
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
