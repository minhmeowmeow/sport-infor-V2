import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../style/style_sport.css';

function SportNew() {
  const [name, setName] = useState('');
  const [strategy, setStrategy] = useState('');
  const [is_team, setIs_team] = useState('');
  const [rule, setRule] = useState('');
  const [time_invented, setTime_invented] = useState('');
  const [failureMessage, setFailureMessage] = useState('');

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name: name,
      strategy: strategy,
      is_team: is_team,
      rule: rule,
      time_invented: time_invented
    };

    try {
      const role = localStorage.getItem('userRole').replace(/^"(.*)"$/, '$1');
      // Send POST request to your backend
      const response = await fetch('http://localhost:3000/sports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sportData: sportData
        }),
      });

      if (!response.ok) {
        setFailureMessage('User registration was not successful!');
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('New admin user created:', data);

      alert('New Sport successful!');

      setName('');
      setStrategy('');
      setIs_team('');
      setRule('');
      setTime_invented('');
      setFailureMessage('');

      window.location.href = '/Login'; 

    } catch (error) {
      console.error('Error registering admin:', error.message);
      // Handle error (e.g., show error message to user)
      alert('Error registering admin. Please try again.');
    }
  };

  return (
    <div className='football-detail'>
    {/* Show message if fail */}
    {failureMessage && <div className="success-message">{failureMessage}</div>}
        <form onSubmit={handleRegisterSubmit}>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="registerName">Tên:</label>
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
            <label className="form-label" htmlFor="newStrategy">Chiến lược:</label>
            <input 
              type="text" 
              id="newStrategy" 
              className="form-control" 
              placeholder="Sport's Strategy" 
              value={strategy} 
              onChange={(e) => setStrategy(e.target.value)}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="newRule">Luật chơi:</label>
            <input 
              type="text" 
              id="newRule" 
              className="form-control" 
              placeholder="Rule of the sport" 
              value={rule} 
              onChange={(e) => setRule(e.target.value)}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="newTeam">Trò chơi đội nhóm:</label>
            <input 
              type="text" 
              id="newTeam" 
              className="form-control" 
              placeholder="Description of the playability" 
              value={is_team} 
              onChange={(e) => setIs_team(e.target.value)}
            />
            </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="newTime">Thời gian môn được thành lập:</label>
            <input 
              type="text" 
              id="newTime" 
              className="form-control" 
              placeholder="Rough year the sport was created" 
              value={time_invented} 
              onChange={(e) => setTime_invented(e.target.value)}
            />
            </div>
            <button type="submit" className="btn btn-primary btn-block mb-3">Sign up</button>
          </form>
    </div>
  );
}

export default SportNew;
