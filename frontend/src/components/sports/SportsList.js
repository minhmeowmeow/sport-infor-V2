import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/SportsList.css';

function SportsList() {
  const [sports, setSports] = useState([]);

  useEffect(() => {
    fetchSports();
}, []);
const [failureMessage, setFailureMessage] = useState('');

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
    if (window.confirm('Are you sure you want to delete this player?')) {
      axios.delete(`http://localhost:3000/sports/delete?id=${sportID}`)
          .then(response => {
              console.log('Sport deleted:', response.data);
              // After deletion, fetch updated list of users
              fetchSports();
          })
          .catch(error => {
              console.error('Error deleting user:', error);
              alert('Unable to delete Sport. Please delete the players and country that play this sport.');
          });
    }
  };
  
  return (
    <div className="container">
      <h2>Sports List</h2>
      <a href={`/sports/new`}>New Sport</a>
      <div>
            <ul  className="sports-list">
            {failureMessage && <div className="success-message">{failureMessage}</div>}
            {sports.map((sports, index) => (
                <li key={index} className="sports-item">
                    <a href={`/sports/detail?id=${sports.id}`}>{sports.name}</a>
                    <a href={`/sports/update?id=${sports.id}`}><button>Update</button></a>
                    <button type='button' onClick={() => deleteSport(sports.id)}>Delete</button>
                </li>
            ))}
            </ul>
      </div>
    </div>
  );
}

export default SportsList;
