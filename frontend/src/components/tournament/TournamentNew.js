import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../style/style_sport.css';

function TournamentNew() {
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [name, setName] = useState('');
  const [start_date, setStart_date] = useState('');
  const [end_date, setEnd_date] = useState('');
  const [failureMessage, setFailureMessage] = useState('');

  useEffect(() => {
    fetchSports();
}, []);

const fetchSports = () => {
  axios.get('http://localhost:3000/sports')
        .then(response => {
            setSports(response.data);
        })
        .catch(error => {
            console.error('Error fetching tournament:', error);
        });
};


  const handleNewTournament = async (e) => {
    e.preventDefault();
    const tournamentData = {
      name: name,
      start_date: start_date,
      end_date: end_date,
      sport_id: selectedSport
    };

    console.log(tournamentData);
    try {
      // Send POST request to your backend
      const response = await fetch('http://localhost:3000/tournament', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tournamentData),
      });

      if (!response.ok) {
        setFailureMessage('New Tournament was not successfully created!');
        throw new Error('Network response was not ok');
      }

      alert('New tournament added successful!');

      setName('');
      setStart_date('');
      setEnd_date('');
      setFailureMessage('');

      window.location.href = '/tournament'; 

    } catch (error) {
      // Handle error (e.g., show error message to user)
      alert('Error creating new tournament. Please try again.');
    }
  };

  return (
    <div className='football-detail'>
    {/* Show message if fail */}
    {failureMessage && <div className="success-message">{failureMessage}</div>}
        <form onSubmit={handleNewTournament}>
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
            <label className="form-label" htmlFor="newAge">Ngày bắt đầu:</label>
            <input 
              type="number" 
              id="newAge" 
              className="form-control" 
              placeholder="Bắt đầu" 
              value={start_date} 
              onChange={(e) => setStart_date(e.target.value)}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="newDescription">Ngày kết thúc:</label>
            <input 
              type="number" 
              id="newDescription" 
              className="form-control" 
              placeholder="Kết thúc" 
              value={end_date} 
              onChange={(e) => setEnd_date(e.target.value)}
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
            <button type="submit" className="btn btn-primary btn-block mb-3">Create</button>
          </form>
    </div>
  );
}

export default TournamentNew;
