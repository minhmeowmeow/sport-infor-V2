import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSport, setfilteredSport] = useState([]);

  const handleSearchInputChange = async (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    try {
      const response = await axios.get(`http://localhost:3000/sports/search?search=${value}`);
      setfilteredSport(response.data); // Assuming response.data is an array of players
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div  className='football-detail'>
      Search for a sport:
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInputChange}
        placeholder="Search by sport name..."
      />

      <ul>
        {filteredSport.map(filteredSport => (
          <li key={filteredSport.id}>
            <a href={`/sports/detail?id=${filteredSport.id}`}>{filteredSport.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;