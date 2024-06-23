import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Guestbook from './pages/Guestbook';
import Sport from './pages/Sport';
import SportsList from './components/SportsList';
import SportDetail from './components/SportDetail';
import Login from './components/Login';
import UserList from './components/temporary';

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
        <Route path="/login" element={<Login />} />
        <Route path="/temporary" element={<UserList />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
