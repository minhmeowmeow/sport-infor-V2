import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../style/style_sport.css';

function SportDetail() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get('id');
  const [sport, setSport] = useState(null);

  useEffect(() => {
  
    axios.get(`http://localhost:3000/sports/${id}`)
      .then(response => {
        setSport(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the sport!', error);
      });
  }, [id]);
 console.log(sport)
  if (!sport) return <div>Loading...</div>;

  return (
    <div className='football-detail'>
      <h2>{sport.name}</h2>
      {/* <p>Players: {sport.players}</p> */}
      <p>Chiến lược: {sport.strategy}</p>
      <p>Trò chơi đội nhóm: {sport.is_team}</p>
      <p>Luật chơi: {sport.rule}</p>
      <p>Thời gian môn được thành lập: {sport.time_invented}</p>
        <section>
          <h2>Hình ảnh cầu thủ</h2>
          {sport.player.map(player => (
              <a key={player.id} href={`/player/detail?id=${player.id}`}>
                <img className='player-image' src={`/images/${sport.name}/${player.id}.jpg`} alt="Cau thu 1"/>
              </a>
            ))}
        </section>
      {/* <p>Countries: {sport.countries}</p> */}
    </div>
  );
}

export default SportDetail;
