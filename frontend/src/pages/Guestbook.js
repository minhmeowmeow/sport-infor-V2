import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/Guestbook.css';

function Guestbook() {
  const [newEntry, setNewEntry] = useState({ name: '', email: '', comment: '', recommend: false, rating: 0 });
  const [score, setScore] = useState([]);
  const [selectedScore, setSelectedScore] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const datet = new Date();
  const now = datet.toISOString();

  useEffect(() => {
    fetchScore();
  }, []);

  const fetchScore = () => {
    axios.get('http://localhost:3000/recommend')
          .then(response => {
              setScore(response.data);
          })
          .catch(error => {
              console.error('Error fetching score:', error);
          });
  };


  const handleNewGuestBook = async (e) => {
    e.preventDefault();
    const guestbookData = {
      name: name,
      date_join: now,
      message: message,
      email: email,
      score: selectedScore
    };

    try {
      // Send POST request to your backend
      const response = await fetch('http://localhost:3000/guestbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(guestbookData),
      });

      if (!response.ok) {
        alert('New Entry was not successfully created!');
        throw new Error('Network response was not ok');
      }

      alert('New entry added successful!');

      setName('');
      setEmail('');
      setMessage('');

      window.location.href = '/'; 

    } catch (error) {
      // Handle error (e.g., show error message to user)
      alert('Error creating new entry. Please try again.');
    }
  };

  const handleStarClick = (index) => {
    setSelectedScore(score[index]);
    console.log(selectedScore);
  };

  return (
    <div className="guestbook-container">
      <h2>Guestbook Entries</h2>
      <div>
        <h3>Add a new entry</h3>
        <input 
          type="text" 
          id="newName" 
          className="form-control" 
          placeholder="Tên" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="email" 
          id="newEmail" 
          className="form-control" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea 
          type="email" 
          id="newEmail" 
          className="form-control" 
          placeholder="Comment" 
          value={message} 
          onChange={(e) => setEmail(e.target.value)}>
          </textarea>
        <div className="rating-container">
          <label>If you would recommend this page to a friend, how would you rate it?:</label>
          <div className="stars">
            {Array(5).fill().map((_, i) => (
              <span key={i} className={i < newEntry.rating ? "star filled" : "star"} onClick={() => handleStarClick(i)}>&#9733;</span>
            ))}
          </div>
        </div>
        <button onClick={handleNewGuestBook}>Add Entry</button>
      </div>
    </div>
  );
}

export default Guestbook;
