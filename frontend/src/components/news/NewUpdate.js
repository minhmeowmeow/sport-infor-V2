import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../style/style_sport.css';

function NewsUpdate() {
  const [sports, setSports] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [failureMessage, setFailureMessage] = useState('');
  const now = new Date();

  const email = JSON.parse(localStorage.getItem('userEmail'));
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get('id');
  
  useEffect(() => {
    fetchSports();
    fetchUser();
    fetchNews();
}, []);

const fetchSports = () => {
  axios.get('http://localhost:3000/sports')
        .then(response => {
            setSports(response.data);
        })
        .catch(error => {
            console.error('Error fetching sport:', error);
        });
};

const fetchUser = () =>{
  axios.get(`http://localhost:3000/users/search?search=${email}`)
        .then(response => {
            setUsers(response.data);
            if(!response.data){
              alert('You must be log in to do this');
              window.location.href = '/Login'; 
            }
        })
        .catch(error => {
            console.error('Error fetching user:', error);
        });
};


  const handleUpdateNew = async (e) => {
    e.preventDefault();
    const newData = {
      title: title,
      description: description,
      updated_date: now,
      user_id: users,
      sport_id: selectedSport
    };

    try {
      const response = await fetch(`http://localhost:3000/news/update?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        setFailureMessage('new Update was not successful!');
        throw new Error('Network response was not ok');
      }

      alert('New Update Successfully!');

      setTitle('');
      setDescription('');
      setFailureMessage('');

      window.location.href = '/news'; 

    } catch (error) {
      // Handle error (e.g., show error message to user)
      alert('Error updating new. Please try again.');
    }
  };

  const fetchNews = () => {
  
    axios.get(`http://localhost:3000/news/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setSelectedSport(response.data.sport_id);
      })
      .catch(error => {
        console.error('There was an error fetching the new!', error);
      });

  };

  return (
    <div className='football-detail'>
    {/* Show message if fail */}
    {failureMessage && <div className="success-message">{failureMessage}</div>}
        <form onSubmit={handleUpdateNew}>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="newName">Tiêu đề:</label>
            <input 
              type="text" 
              id="newName" 
              className="form-control" 
              placeholder="Tiêu đề" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="newDescription">Mô tả:</label>
            <input 
              type="text" 
              id="newDescription" 
              className="form-control" 
              placeholder="Mô tả" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
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

export default NewsUpdate;
