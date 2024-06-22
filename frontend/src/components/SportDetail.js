import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './style/SportDetail.css';

function SportDetail() {
  const { id } = useParams();
  const [sport, setSport] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/sports/${id}`)
      .then(response => {
        setSport(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the sport!', error);
      });
  }, [id]);

  if (!sport) return <div>Loading...</div>;

  return (
    <div>
      <h2>{sport.name}</h2>
      <p>Players: {sport.players}</p>
      <p>Strategy: {sport.strategy}</p>
      <p>Is Team Game: {sport.is_team_game ? 'Yes' : 'No'}</p>
      <p>Rules: {sport.rules}</p>
      <p>Facts: {sport.facts}</p>
      <p>Statistics: {sport.statistics}</p>
      <p>Countries: {sport.countries}</p>
    </div>
  );
}

export default SportDetail;
