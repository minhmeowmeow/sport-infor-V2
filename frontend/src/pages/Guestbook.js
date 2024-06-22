import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/Guestbook.css';

function Guestbook() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ name: '', email: '', comment: '', recommend: false, rating: 0 });

  useEffect(() => {
    axios.get('http://localhost:5000/api/guestbook')
      .then(response => {
        setEntries(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the guestbook entries!', error);
      });
  }, []);

  const handleAddEntry = () => {
    axios.post('http://localhost:5000/api/guestbook', newEntry, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      setEntries([...entries, response.data]);
      setNewEntry({ name: '', email: '', comment: '', recommend: false, rating: 0 });
    })
    .catch(error => {
      console.error('There was an error adding the guestbook entry!', error);
    });
  };

  const handleStarClick = (newRating) => {
    setNewEntry({ ...newEntry, rating: newRating });
  };

  return (
    <div className="guestbook-container">
      <h2>Guestbook Entries</h2>
      <ul className="guestbook-list">
        {entries.map(entry => (
          <li key={entry.id} className="guestbook-entry">
            <h3>{entry.name}</h3>
            <p>{entry.comment}</p>
            <div className="stars">
              {Array(entry.rating).fill().map((_, i) => (
                <span key={i} className="star filled">&#9733;</span>
              ))}
              {Array(5 - entry.rating).fill().map((_, i) => (
                <span key={i} className="star">&#9733;</span>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <div>
        <h3>Add a new entry</h3>
        <input type="text" placeholder="Name" value={newEntry.name} onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })} />
        <input type="email" placeholder="Email" value={newEntry.email} onChange={(e) => setNewEntry({ ...newEntry, email: e.target.value })} />
        <textarea placeholder="Comment" value={newEntry.comment} onChange={(e) => setNewEntry({ ...newEntry, comment: e.target.value })}></textarea>
        <label>
          <input type="checkbox" checked={newEntry.recommend} onChange={(e) => setNewEntry({ ...newEntry, recommend: e.target.checked })} /> Recommend
        </label>
        <div className="rating-container">
          <label>Rating:</label>
          <div className="stars">
            {Array(5).fill().map((_, i) => (
              <span key={i} className={i < newEntry.rating ? "star filled" : "star"} onClick={() => handleStarClick(i + 1)}>&#9733;</span>
            ))}
          </div>
        </div>
        <button onClick={handleAddEntry}>Add Entry</button>
      </div>
    </div>
  );
}

export default Guestbook;
