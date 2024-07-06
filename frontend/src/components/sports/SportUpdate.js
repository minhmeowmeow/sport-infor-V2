import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../style/style_sport.css';

function SportUpdate() {
  const [name, setName] = useState('');
  const [strategy, setStrategy] = useState('');
  const [is_team, setIs_team] = useState('');
  const [rule, setRule] = useState('');
  const [time_invented, setTime_invented] = useState('');

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get('id');

  useEffect(() => {
    if(id){
      fetchSport();
    
    }
  }, [id]);

  const handleUpdateSport = async (e) => {
    e.preventDefault();
    const sportData = {
      name: name,
      strategy: strategy,
      is_team: is_team,
      rule: rule,
      time_invented: time_invented
    };

    try {
      let response = await fetch(`http://localhost:3000/sports/update?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sportData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Sport updated:', data);

      // Handle successful registration (e.g., show success message, redirect user, etc.)
      alert('Sport updated!');

      setName('');
      setStrategy('');
      setIs_team('');
      setRule('');
      setTime_invented('');

      window.location.href = '/sports'; 

    } catch (error) {
      console.error('Error updating sport:', error.message);
      // Handle error (e.g., show error message to user)
      alert('Error updating sport. Please try again.');
    }
  };

  const fetchSport = async () => {
  
    axios.get(`http://localhost:3000/sports/${id}`)
      .then(response => {
      setName(response.data.name);
      setStrategy(response.data.strategy);
      setIs_team(response.data.is_team);
      setRule(response.data.rule);
      setTime_invented(response.data.time_invented);
      })
      .catch(error => {
        console.error('There was an error fetching the sport!', error);
      });
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
