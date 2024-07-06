import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/SportsList.css';

function TournamentsList() {
  const [tournament, setTournament] = useState([]);

  useEffect(() => {
    fetchTournament();
}, []);

  const fetchTournament = () => {
    axios.get('http://localhost:3000/tournament')
          .then(response => {
            setTournament(response.data);
          })
          .catch(error => {
              console.error('Error fetching tournament:', error);
          });
};

  const deleteTournament = (tournamentId) => {
    if (window.confirm('Are you sure you want to delete this tournament?')) {
      axios.delete(`http://localhost:3000/tournament/delete?id=${tournamentId}`)
          .then(response => {
              console.log('tournament deleted:', response.data);
              // After deletion, fetch updated list of users
              fetchTournament();
          })
          .catch(error => {
              console.error('Error deleting tournament:', error);
          });
    }
  };

  return (
    <div className="container">
      <h2>Tournaments List</h2>
      <a href={`/tournament/new`}>New Sport</a>
        <div>
            <ul  className="players-list">
            {tournament.map((tournament, index) => (
                <li key={index} className="player-item">
                    <a href={`/tournament/detail?id=${tournament.id}`}>{tournament.name}</a>
                    <a href={`/tournament/update?id=${tournament.id}`}><button>Update</button></a>
                    <button type='button' onClick={() => deleteTournament(tournament.id)}>Delete</button>
                </li>
            ))}
            </ul>
      </div>
    </div>
  );
}

export default TournamentsList;
