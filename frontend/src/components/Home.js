import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './style/Home.css';

function Home() {
  const [news, setNews] = useState([]);

  
  useEffect(() => {
    axios.get('http://localhost:3000/news/latest')
          .then(response => {
            setNews(response.data);
          })
          .catch(error => {
              console.error('Error fetching news:', error);
          });
  }, []);


  return (
    <main className="container">
      <h2>Welcome to SportsInfo</h2>
      <p>Your ultimate source for all sports information.</p>
      <Link to="/sports" className="button">Explore Sports</Link>

      <section className="latest-news">
        <h3>Latest Sports News</h3>
        <ul>
          {news.map(news => (
            <li className="news-item">
              <h4>{news.title}</h4>
              <p>{news.description}</p>
              <a href={`/news/detail?id=${news.id}`}>{news.title}</a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Home;
