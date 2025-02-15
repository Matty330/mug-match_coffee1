import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/LandingPage';
import LandingPage from './pages/LandingPage';
import Favorites from './pages/Favorites copy';
import CoffeeShops from './pages/CoffeeShops copy';
import Settings from './pages/ProfileSettings';
import CoffeeQuiz from './pages/CoffeeQuiz';
import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Map from './components/mapComponent';
import Fact from './components/factComponent';
import './index.css';

function App() {
  return  (
    <>
      <Navbar />
    <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/fact' element={<Fact />} />
            <Route path="/landingpage" element={<LandingPage />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/quiz' element={<CoffeeQuiz />} />
            <Route path='/shops' element={<CoffeeShops />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/map' element={<Map />} />
    </Routes>
    </>
  );
};

export default App;