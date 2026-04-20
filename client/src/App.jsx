import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PortalHome from './pages/PortalHome';
import FlightBooking from './pages/FlightBooking';
import HotelBooking from './pages/HotelBooking';
import TrainBooking from './pages/TrainBooking';
import BusBooking from './pages/BusBooking';
import DineInBooking from './pages/DineInBooking';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import AnimatedBackground from './components/AnimatedBackground';
import PnrStatus from './pages/PnrStatus';
import AiPlanner from './pages/AiPlanner';

function App() {
  return (
    <BrowserRouter>
      <AnimatedBackground />
      <Routes>
        <Route path="/" element={<PortalHome />} />
        <Route path="/flights" element={<FlightBooking />} />
        <Route path="/hotels" element={<HotelBooking />} />
        <Route path="/dine-in" element={<DineInBooking />} />
        <Route path="/trains" element={<TrainBooking />} />
        <Route path="/buses" element={<BusBooking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pnr" element={<PnrStatus />} />
        <Route path="/ai-planner" element={<AiPlanner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
