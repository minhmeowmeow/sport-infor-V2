import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../style/style_sport.css';

function PlayerUpdate() {
  const [sports, setSports] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedSport, setSelectedSport] = useState({});
  const [selectedTeam, setSelectedTeam] = useState({});
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [role, setRole] = useState('');
  const [failureMessage, setFailureMessage] = useState('');

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get('id');

  const fetchSports = () => {
    axios.get('http://localhost:3000/sports')
          .then(response => {
              setSports(response.data);
          })
          .catch(error => {
              console.error('Error fetching player:', error);
          });
};

  const fetchTeams = () => {
    axios.get('http://localhost:3000/team')
          .then(response => {
              setTeams(response.data);
          })
          .catch(error => {
              console.error('Error fetching team:', error);
          });
  };

  useEffect(() => {
    fetchSports();
    fetchTeams();
    fetchPlayer();
  }, []);

  const handleUpdatePlayer = async (e) => {
    e.preventDefault();
    const playerData = {
      name: name,
      age: age,
      description: description,
      role: role,
      team: selectedTeam,
      sport: selectedSport
    };

    try {
      const response = await fetch(`http://localhost:3000/player/update?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerData),
      });

      if (!response.ok) {
        setFailureMessage('Player Update was not successful!');
        throw new Error('Network response was not ok');
      }

      alert('Player Update Successfully!');

      setName('');
      setAge('');
      setDescription('');
      setRole('');
      setFailureMessage('');

      window.location.href = '/player'; 

    } catch (error) {
      // Handle error (e.g., show error message to user)
      alert('Error updating player. Please try again.');
    }
  };

  const fetchPlayer = () => {
  
    axios.get(`http://localhost:3000/player/${id}`)
      .then(response => {
    console.log(response.data);
        setName(response.data.name);
        setAge(response.data.age);
        setDescription(response.data.description);
        setRole(response.data.role);
        setSelectedSport(response.data.sport_id.id); // Accessing sport_id.id
         console.log(selectedSport);
        setSelectedTeam(response.data.team_id.id);
      })
      .catch(error => {
        console.error('There was an error fetching the player!', error);
      });

  };

  return (
    <div className='football-detail'>
    {failureMessage && <div className="success-message">{failureMessage}</div>}
        <form onSubmit={handleUpdatePlayer}>
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
                value={selectedSport ? selectedSport.id : ''}
                onChange={(e) => setSelectedSport(e.target.value)}
              >
                <option value="">-- Chọn môn thể thao --</option>
                {sports.map(sport => (
                  <option key={sport.id} value={sport}>{sport.name}</option>
                ))}
              </select>
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="selectTeam">Chọn đội:</label>
                <select
                  id="selectTeam"
                  className="form-select"
                  value={selectedTeam ? selectedTeam.id : ''}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                >
                  <option value="">-- Chọn đội --</option>
                  {teams.map(team => (
                    <option key={team.id} value={team}>{team.name}</option>
                  ))}
                </select>
              </div>
            <button type="submit" className="btn btn-primary btn-block mb-3">Update</button>
          </form>
    </div>
  );
}

export default PlayerUpdate;
