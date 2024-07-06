import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../style/style_sport.css';

function NewsDetail() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get('id');
  const [news, setNews] = useState(null);

  useEffect(() => {
  
    axios.get(`http://localhost:3000/news/${id}`)
      .then(response => {
        setNews(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the sport!', error);
      });
  }, [id]);
  if (!news) return <div>Loading...</div>;

  return (
    <div className='football-detail'>
      <h2>{news.title}</h2>
      <p>{news.description}</p><br/><br/>
      <p>Created - {news.created_date}, Updated - {news.updated_date}</p>
    </div>
  );
}

export default NewsDetail;
