import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../style/style_sport.css';

function UserUpdate() {
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [failureMessage, setFailureMessage] = useState('');


  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get('id');

  const fetchRoles = () => {
    axios.get('http://localhost:3000/role')
          .then(response => {
              setSports(response.data);
          })
          .catch(error => {
              console.error('Error fetching role:', error);
          });
};

  useEffect(() => {
    fetchRoles();
    fetchUser();
  }, []);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const userData = {
      username: name,
      email: email,
    };

    try {
      const response = await fetch(`http://localhost:3000/users/update?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        setFailureMessage('User Update was not successful!');
        throw new Error('Network response was not ok');
      }

      alert('User Update Successfully!');

      setName('');
      setEmail('');
      setFailureMessage('');

      window.location.href = '/users'; 

    } catch (error) {
      // Handle error (e.g., show error message to user)
      alert('Error updating user. Please try again.');
    }
  };

  const fetchUser = () => {
  
    axios.get(`http://localhost:3000/users/${id}`)
      .then(response => {
    console.log(response.data);
        setName(response.data.username);
        setEmail(response.data.email);
      })
      .catch(error => {
        console.error('There was an error fetching the user!', error);
      });

  };

  return (
    <div className='football-detail'>
    {/* Show message if fail */}
    {failureMessage && <div className="success-message">{failureMessage}</div>}
        <form onSubmit={handleUpdateUser}>
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
            <label className="form-label" htmlFor="newAge">Email:</label>
            <input 
              type="number" 
              id="newAge" 
              className="form-control" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
            <button type="submit" className="btn btn-primary btn-block mb-3">Update</button>
          </form>
    </div>
  );
}

export default UserUpdate;
