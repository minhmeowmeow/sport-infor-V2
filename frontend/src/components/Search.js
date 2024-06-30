import React, { useState } from 'react';
import axios from 'axios';

const PlayerList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSport, setfilteredSport] = useState([]);

  const handleSearchInputChange = async (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    try {
      const response = await axios.get(`http://your-nestjs-api-url/players?q=${value}`);
      setfilteredSport(response.data); // Assuming response.data is an array of players
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInputChange}
        placeholder="Search by player name..."
      />

      <ul>
        {filteredSport.map(player => (
          <li key={player.id}>
            {player.name}
            <a href={`/sports/detail?id=${sports.id}`}>{sports.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;