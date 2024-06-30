import React from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';


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
import Register from './components/Register';
import RegisterAdmin from './components/RegisterAdmin';
import UserList from './components/UserList';
import Football_Ronaldo from './components/player/football/Football_Ronaldo';
import Football_Messi from './components/player/football/Football_Messi';

import Judo_Yamashita from './components/player/judo/Judo_Yamashita';
import Judo_Teddy from './components/player/judo/Judo_Teddy';

import Tennis_Nadal from './components/player/tennis/Tennis_Nadal';
import Tennis_Williams from './components/player/tennis/Tennis_Williams';

import Motorcycle_Márquez from './components/player/motor/Motorcycle_Márquez';
import Motorcycle_Valentino_Rossi from './components/player/motor/Motorcycle_Valentino_Rossi';

import Volleyball_Giba from './components/player/volleyball/Volleyball_Giba';
import Volleyball_Zehra_Gunes from './components/player/volleyball/Volleyball_Zehra_Gunes';

import Golf_Jack_Nicklaus from './components/player/golf/Golf_Jack_Nicklaus';
import Golf_Tiger_Woods from './components/player/golf/Golf_Tiger_Woods';

import Chess_Magnus_Carlsen from './components/player/chess/Chess_Magnus_Carlsen';
import Chess_Garry_Kasparov from './components/player/chess/Chess_Garry_Kasparov';

import Billards_Efren_Reyes from './components/player/billards/Billards_Efren_Reyes';
import Billards_Ronnie_Sullivan from './components/player/billards/Billards_Ronnie_Sullivan';

import Badminton_Lee_Chong_Wei from './components/player/badminton/Badminton_Lee_Chong_Wei';
import Badminton_LinDan from './components/player/badminton/Badminton_LinDan';

import Swimming_Lan_Thorpe from './components/player/swimming/Swimming_Lan_Thorpe';
import Swimming_Michael_Phelps from './components/player/swimming/Swimming_Michael_Phelps';

import AthleticsDetail from './components/AthleticsDetail';
import Athletics_Usain_Bolt from './components/player/athletics/Athletics_Usain_Bolt';
import Athletics_Allyson_Felix from './components/player/athletics/Athletics_Allyson_Felix';


function App() {
  return (
    <Router>
      <Header />
      <Routes>  
        <Route path="/" element={<Home />} />
       
        
        <Route path="/sports/football_ronaldo" element={<Football_Ronaldo />} />
        <Route path="/sports/football_messi" element={<Football_Messi />} />

        <Route path="/sports/judo_yamashita" element={<Judo_Yamashita />} />
        <Route path="/sports/judo_teddy" element={<Judo_Teddy />} />

        <Route path="/sports/tennis_nadal" element={<Tennis_Nadal />} />
        <Route path="/sports/tennis_williams" element={<Tennis_Williams />} />

        <Route path="/sports/motorcycle_márquez" element={<Motorcycle_Márquez />} />
        <Route path="/sports/motorcycle_valentino_rossi" element={<Motorcycle_Valentino_Rossi />} />

        <Route path="/sports/volleyball_giba" element={<Volleyball_Giba />} />
        <Route path="/sports/volleyball_zehra_gunes" element={<Volleyball_Zehra_Gunes />} />

        <Route path="/sports/golf_jack_nicklaus" element={<Golf_Jack_Nicklaus />} />
        <Route path="/sports/golf_tiger_woods" element={<Golf_Tiger_Woods />} />


        <Route path="/sports/chess_magnus_carlsen" element={<Chess_Magnus_Carlsen />} />
        <Route path="/sports/chess_garry_kasparov" element={<Chess_Garry_Kasparov />} />

        <Route path="/sports/billards_efren_reyes" element={<Billards_Efren_Reyes />} />
        <Route path="/sports/billards_ronnie_sullivan" element={<Billards_Ronnie_Sullivan />} />

        <Route path="/sports/badminton_lee_chong_wei" element={<Badminton_Lee_Chong_Wei />} />
        <Route path="/sports/badminton_lindan" element={<Badminton_LinDan />} />

        <Route path="/sports/swimming_lan_thorpe" element={<Swimming_Lan_Thorpe />} />
        <Route path="/sports/swimming_michael_phelps" element={<Swimming_Michael_Phelps />} />

        <Route path="/sports/Athletics" element={<AthleticsDetail />} />
        <Route path="/sports/athletics_usain_bolt" element={<Athletics_Usain_Bolt/>} />
        <Route path="/sports/athletics_allyson_felix" element={<Athletics_Allyson_Felix />} />

        <Route path="/sports/detail" element={<SportDetail />} />
        {/* <Route path="/sports/player" element={<SportPlayer />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/guestbook" element={<Guestbook />} />
        <Route path="/sports" element={<SportsList />} />
        <Route path="/sports/:id" element={<SportDetail />} />
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
