import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../style/style_sport.css';

function TournamentDetail() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get('id');
  const [tournament, setTournament] = useState(null);

  useEffect(() => {
  
    axios.get(`http://localhost:3000/tournament/${id}`)
      .then(response => {
        setTournament(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the sport!', error);
      });
  }, [id]);
  if (!tournament) return <div>Loading...</div>;

  return (
    <div className='football-detail'>
      <h2>{tournament.name}</h2>
      <p>Tên: {tournament.name}</p>
      <p>Ngày bắt đầu: {tournament.start_date}</p>
      <p>Ngày kết thúc: {tournament.end_date}</p>
    </div>
  );
}

export default TournamentDetail;
