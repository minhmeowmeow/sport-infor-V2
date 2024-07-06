import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../style/style_sport.css';

function PlayerDetail() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get('id');
  const [player, setPlayer] = useState(null);

  useEffect(() => {
  
    axios.get(`http://localhost:3000/player/${id}`)
      .then(response => {
        setPlayer(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the sport!', error);
      });
  }, [id]);
  if (!player) return <div>Loading...</div>;

  return (
    <div className='football-detail'>
      <h2>{player.name}</h2>
      <img className='player-image' src={`/images/${player.sport_id.name}/${player.id}.jpg`} alt="Cau thu 1"/>
      {/* <p>Players: {sport.players}</p> */}
      <p>Tuổi: {player.age}</p>
      <p>Mô tả người chơi: {player.description}</p>
      <p>Vai trò trong đội: {player.role}</p>
    </div>
  );
}

export default PlayerDetail;
