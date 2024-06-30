import React from 'react';
import { Link } from 'react-router-dom';

import './style/Home.css';

function Home() {
  const latestNews = [
    {
      id: 1,
      title: "Football World Cup",
      description: "The latest updates from the Football World Cup."
    },
    {
      id: 2,
      title: "Olympic Games",
      description: "Highlights from the Olympic Games."
    },
    {
      id: 3,
      title: "Grand Slam Tennis",
      description: "Exciting matches from the Grand Slam tournaments."
    },
    {
      id: 4,
      title: "Football Euro 2024",
      description: "The latest updates from the Football Euro."
    }
  ];

  return (
    <main className="container">
      <h2>Welcome to SportsInfo</h2>
      <p>Your ultimate source for all sports information.</p>
      <Link to="/sports" className="button">Explore Sports</Link>

      <section className="latest-news">
        <h3>Latest Sports News</h3>
        <ul>
          {latestNews.map(news => (
            <li key={news.id} className="news-item">
              <h4>{news.title}</h4>
              <p>{news.description}</p>
              <Link to={`/news/${news.id}`}>Read more</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Home;
