import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/SportsList.css';

function SportsList() {
  const [sports, setSports] = useState([]);

  useEffect(() => {
    fetchSports();
}, []);

  const fetchSports = () => {
    axios.get('http://localhost:3000/sports')
          .then(response => {
              setSports(response.data);
          })
          .catch(error => {
              console.error('Error fetching sports:', error);
          });
};

  const deleteSport = (sportID) => {
      axios.delete(`http://localhost:3000/sports/${sportID}`)
          .then(response => {
              console.log('Sport deleted:', response.data);
              // After deletion, fetch updated list of users
              fetchSports();
          })
          .catch(error => {
              console.error('Error deleting user:', error);
          });
  };

  const updateSport = (sportId) => {
    window.location.href(`/update/${sportId}`);
  };

  return (
    <div className="container">
      <h2>Sports List</h2>
      <ul className="sports-list">
      </ul>
      <div>
            <ul  className="sports-list">
            {sports.map((sports, index) => (
                <li key={index} className="sports-item">
                    <a href={`/sports/detail?id=${sports.id}`}>{sports.name}</a>
                    <button onClick={() => deleteSport(sports.id)}>Delete</button>
                    <button onClick={() => updateSport(sports.id)}>Update</button>
                </li>
            ))}
            </ul>
      <ul>
      </ul>
      </div>
    </div>
  );
}

export default SportsList;
