import React from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';


import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Guestbook from './pages/Guestbook';
import SportsList from './components/sports/SportsList';
import SportDetail from './components/sports/SportDetail';
import SportUpdate from './components/sports/SportUpdate';
import SportNew from './components/sports/SportNew';
import PlayersList from './components/player/PlayersList';
import PlayerDetail from './components/player/PlayerDetail';
import PlayerUpdate from './components/player/PlayerUpdate';
import PlayerNew from './components/player/PlayerNew';
import NewsList from './components/news/NewsList';
import NewsDetail from './components/news/NewDetail';
import NewsUpdate from './components/news/NewUpdate';
import NewCreate from './components/news/NewCreate';
import Login from './components/Login';
import Register from './components/Register';
import RegisterAdmin from './components/RegisterAdmin';
import UserList from './components/UserList';


function App() {
  return (
    <Router>
      <Header />
      <Routes>  
        <Route path="/" element={<Home />} />
       
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/guestbook" element={<Guestbook />} />
        <Route path="/sports" element={<SportsList />} />
        <Route path="/sports/:id" element={<SportDetail />} />
        <Route path="/sports/update" element={<SportUpdate />} />
        <Route path="/sports/new" element={<SportNew />} />
        <Route path="/player" element={<PlayersList />} />
        <Route path="/player/:id" element={<PlayerDetail />} />
        <Route path="/player/update" element={<PlayerUpdate />} />
        <Route path="/player/new" element={<PlayerNew />} />
        <Route path="/news" element={<NewsList />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/news/update" element={<NewsUpdate />} />
        <Route path="/news/create" element={<NewCreate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registeradmin" element={<RegisterAdmin />} />
        <Route path="/temporary" element={<UserList />} />
      </Routes>
      <Footer />
     </Router>
  );
}

export default App;
