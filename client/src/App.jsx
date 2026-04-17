import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import AnimatedBackground from './components/AnimatedBackground';
import PnrStatus from './pages/PnrStatus';

function App() {
  return (
    <BrowserRouter>
      <AnimatedBackground />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pnr" element={<PnrStatus />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
