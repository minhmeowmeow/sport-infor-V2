import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../style/style_sport.css';

function PlayerNew() {
  const [sports, setSports] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [role, setRole] = useState('');
  const [failureMessage, setFailureMessage] = useState('');

  useEffect(() => {
    fetchSports();
    fetchTeam();
}, []);

const fetchSports = () => {
  axios.get('http://localhost:3000/sports')
        .then(response => {
            setSports(response.data);
        })
        .catch(error => {
            console.error('Error fetching player:', error);
        });
};

  const fetchTeam = () => {
    axios.get('http://localhost:3000/team')
          .then(response => {
              setTeams(response.data);
          })
          .catch(error => {
              console.error('Error fetching team:', error);
          });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const playerData = {
      name: name,
      age: age,
      description: description,
      role: role,
      team_id: selectedTeam,
      sport_id: selectedSport
    };

    console.log(playerData);
    try {
      // Send POST request to your backend
      const response = await fetch('http://localhost:3000/player', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerData),
      });

      if (!response.ok) {
        setFailureMessage('User registration was not successful!');
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('New admin user created:', data);

      alert('New Player added successful!');

      setName('');
      setAge('');
      setDescription('');
      setRole('');
      setFailureMessage('');

      window.location.href = '/player'; 

    } catch (error) {
      // Handle error (e.g., show error message to user)
      alert('Error creating new player. Please try again.');
    }
  };

  return (
    <div className='football-detail'>
    {/* Show message if fail */}
    {failureMessage && <div className="success-message">{failureMessage}</div>}
        <form onSubmit={handleRegisterSubmit}>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="newName">Tên:</label>
            <input 
              type="text" 
              id="newName" 
              className="form-control" 
              placeholder="Tên" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="newAge">Tuổi:</label>
            <input 
              type="text" 
              id="newAge" 
              className="form-control" 
              placeholder="Tuổi" 
              value={age} 
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="newDescription">Mô tả ngắn người chơi:</label>
            <input 
              type="text" 
              id="newDescription" 
              className="form-control" 
              placeholder="Mô tả ngắn" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="newRole">Vai trò trong đội:</label>
            <input 
              type="text" 
              id="newRole" 
              className="form-control" 
              placeholder="Vai trò" 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
            />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="selectSport">Chọn môn thể thao:</label>
              <select
                id="selectSport"
                className="form-select"
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
              >
                <option value="">-- Chọn môn thể thao --</option>
                {sports.map(sport => (
                  <option key={sport.id} value={sport.id}>{sport.name}</option>
                ))}
              </select>
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="selectTeam">Chọn đội:</label>
                <select
                  id="selectTeam"
                  className="form-select"
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                >
                  <option value="">-- Chọn đội --</option>
                  {teams.map(team => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                  ))}
                </select>
              </div>
            <button type="submit" className="btn btn-primary btn-block mb-3">Create</button>
          </form>
    </div>
  );
}

export default PlayerNew;
