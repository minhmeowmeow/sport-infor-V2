import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/SportsList.css';

function PlayersList() {
  const [player, setPlayer] = useState([]);

  useEffect(() => {
    fetchPlayers();
}, []);

  const fetchPlayers = () => {
    axios.get('http://localhost:3000/player')
          .then(response => {
            setPlayer(response.data);
          })
          .catch(error => {
              console.error('Error fetching player:', error);
          });
};

  const deletePlayer = (playerId) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      axios.delete(`http://localhost:3000/player/delete?id=${playerId}`)
          .then(response => {
              console.log('player deleted:', response.data);
              // After deletion, fetch updated list of users
              fetchPlayers();
          })
          .catch(error => {
              console.error('Error deleting player:', error);
          });
    }
  };

  return (
    <div className="container">
      <h2>Player List</h2>
      <a href={`/player/new`}>New Player</a>
        <div>
            <ul  className="players-list">
            {player.map((player, index) => (
                <li key={index} className="player-item">
                    <a href={`/player/detail?id=${player.id}`}>{player.name}</a>
                    <a href={`/player/update?id=${player.id}`}><button>Update</button></a>
                    <button type='button' onClick={() => deletePlayer(player.id)}>Delete</button>
                </li>
            ))}
            </ul>
      </div>
    </div>
  );
}

export default PlayersList;
