import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style/Header.css';

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const role = JSON.parse(localStorage.getItem('userRole'));
    const email = JSON.parse(localStorage.getItem('userEmail'));
    if (role && email) {
      setUser({ email, role });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    setUser(null);
    window.location.href = '/'; // Điều hướng về trang chủ sau khi đăng xuất
  };

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
        <li><Link to="/player">Players</Link></li>
        <li><Link to="/news">News</Link></li>
        <li><Link to="/tournament">Tournament</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/guestbook">Guestbook</Link></li>
        {user ? (
          <>
            {user.role === 'ROLE_ADMIN' && <li><Link to="/users">Users</Link></li>}
            <li>Welcome, {user.email} ({user.role})</li>
            <li><button onClick={(handleLogout)}>Logout</button></li>
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
