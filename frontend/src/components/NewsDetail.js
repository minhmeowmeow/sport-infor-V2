import React from 'react';
import { Link } from 'react-router-dom';
import './style/NewsDetail.css';

function NewsDetail1() {
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

  return (
    <main className="container">
      <h2>{news.title}</h2>
      <section>
      {news.description}
      </section>
      {news.created_date}
      {news.updated_date}
      <Link to="/" className="back-link">Quay lại trang chủ</Link>
    </main>
  );
}

export default NewsDetail1;
