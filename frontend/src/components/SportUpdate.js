import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './style/style_sport.css';

function SportUpdate() {
  const [name, setName] = useState('');
  const [strategy, setStrategy] = useState('');
  const [is_team, setIs_team] = useState('');
  const [rule, setRule] = useState('');
  const [time_invented, setTime_invented] = useState('');
  const [sport, setSport] = useState(null);

  useEffect(() => {
    fetchSport();
    
    setName(sport.name);
    setStrategy(sport.strategy);
    setIs_team(sport.is_team);
    setRule(sport.rule);
    setTime_invented(sport.time_invented);
}, []);

  const handleUpdateSport = async (e) => {
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
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sportData: sportData
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

      window.location.href = '/Login'; 

    } catch (error) {
      console.error('Error registering admin:', error.message);
      // Handle error (e.g., show error message to user)
      alert('Error registering admin. Please try again.');
    }
  };

  const fetchSport = () => {
  
    axios.get(`http://localhost:3000/sports/${id}`)
      .then(response => {
        setSport(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the sport!', error);
      });

      
      if (!response.ok) {
        setFailureMessage('User registration was not successful!');
        throw new Error('Network response was not ok');
      }

  };

  return (
    <div className='football-detail'>
        <form onSubmit={handleUpdateSport}>
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

export default SportUpdate;
