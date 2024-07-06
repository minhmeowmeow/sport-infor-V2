import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/SportsList.css';

function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
}, []);

  const fetchNews = () => {
    axios.get('http://localhost:3000/news')
          .then(response => {
            setNews(response.data);
          })
          .catch(error => {
              console.error('Error fetching news:', error);
          });
};

  const deleteNews = (newsID) => {
    if (window.confirm('Are you sure you want to delete this new?')) {
      axios.delete(`http://localhost:3000/news/delete?id=${newsID}`)
          .then(response => {
              console.log('new deleted:', response.data);
              // After deletion, fetch updated list of users
              fetchNews();
          })
          .catch(error => {
              console.error('Error deleting new:', error);
          });
    }
  };

  return (
    <div className="container">
      <h2>News List</h2>
      <a href={`/news/create`}>Create a news report</a>
        <div>
            <ul  className="players-list">
            {news.map((news, index) => (
                <li key={index} className="player-item">
                    <a href={`/news/detail?id=${news.id}`}>{news.title}</a>
                    <a href={`/news/update?id=${news.id}`}><button>Update</button></a>
                    <button type='button' onClick={() => deleteNews(news.id)}>Delete</button>
                </li>
            ))}
            </ul>
      </div>
    </div>
  );
}

export default NewsList;
