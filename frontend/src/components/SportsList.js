import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/SportsList.css';

function SportsList() {
  const [sports, setSports] = useState([]);
  const [newSport, setNewSport] = useState({ name: '', players: '', strategy: '', is_team_game: false, rules: '', facts: '', statistics: '', countries: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/sports')
      .then(response => {
        setSports(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the sports!', error);
      });
  }, []);

  const handleAddSport = () => {
    axios.post('http://localhost:5000/api/sports', newSport, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      setSports([...sports, response.data]);
      setNewSport({ name: '', players: '', strategy: '', is_team_game: false, rules: '', facts: '', statistics: '', countries: '' });
    })
    .catch(error => {
      console.error('There was an error adding the sport!', error);
    });
  };

  return (
    <div className="container">
      <h2>Sports List</h2>
      <ul className="sports-list">
        {sports.map(sport => (
          <li key={sport.id} className="sport-item">
            <h3>{sport.name}</h3>
          </li>
        ))}
      </ul>
      <div>
        <h3>Add a new sport</h3>
        <input type="text" placeholder="Name" value={newSport.name} onChange={(e) => setNewSport({ ...newSport, name: e.target.value })} />
        <input type="text" placeholder="Players" value={newSport.players} onChange={(e) => setNewSport({ ...newSport, players: e.target.value })} />
        <input type="text" placeholder="Strategy" value={newSport.strategy} onChange={(e) => setNewSport({ ...newSport, strategy: e.target.value })} />
        <input type="checkbox" checked={newSport.is_team_game} onChange={(e) => setNewSport({ ...newSport, is_team_game: e.target.checked })} /> Is Team Game
        <input type="text" placeholder="Rules" value={newSport.rules} onChange={(e) => setNewSport({ ...newSport, rules: e.target.value })} />
        <input type="text" placeholder="Facts" value={newSport.facts} onChange={(e) => setNewSport({ ...newSport, facts: e.target.value })} />
        <input type="text" placeholder="Statistics" value={newSport.statistics} onChange={(e) => setNewSport({ ...newSport, statistics: e.target.value })} />
        <input type="text" placeholder="Countries" value={newSport.countries} onChange={(e) => setNewSport({ ...newSport, countries: e.target.value })} />
        <button onClick={handleAddSport} className="button">Add Sport</button>
      </div>
    </div>
  );
}

export default SportsList;
