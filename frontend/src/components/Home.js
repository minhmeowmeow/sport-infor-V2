import React from 'react';
import { Link } from 'react-router-dom';
import './style/Home.css';

function Home() {
  return (
    <main className="container">
      <h2>Welcome to SportsInfo</h2>
      <p>Your ultimate source for all sports information.</p>
      <Link to="/sports" className="button">Explore Sports</Link>
    </main>
  );
}

export default Home;
