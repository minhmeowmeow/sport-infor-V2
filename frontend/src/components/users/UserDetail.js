import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../style/style_sport.css';

function UserDetail() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get('id');
  const [users, setUsers] = useState(null);

  useEffect(() => {
  
    axios.get(`http://localhost:3000/users/${id}`)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the user!', error);
      });
  }, [id]);
  if (!users) return <div>Loading...</div>;

  return (
    <div className='football-detail'>
      <h2>{users.name}</h2>
      <p>Tên: {users.username}</p>
      <p>Email: {users.email}</p>
    </div>
  );
}

export default UserDetail;
