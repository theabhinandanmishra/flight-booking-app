import React from 'react';

import { useNavigate } from 'react-router-dom';

const FlightCard = ({ flight, isCheapest, index = 0 }) => {
  const navigate = useNavigate();

  return (
    <div className={`glass flight-card animate-fade-in-up delay-${(index % 6 + 1) * 100}`}>
      {isCheapest && <span className="cheapest-badge">🔥 Cheapest rate</span>}
      
      <div className="airline-info">
        <div className="airline-logo">
          {flight.flightNumber.split('-')[0]}
        </div>
        <div>
          <div className="airline-name">{flight.airline}</div>
          <div className="flight-number">{flight.flightNumber}</div>
        </div>
      </div>

      <div className="flight-times">
        <div className="time-block">
          <div className="time">{flight.departureTime}</div>
          <div className="location">{flight.origin}</div>
        </div>
        
        <div className="duration">
          <span>{flight.duration}</span>
          <div className="flight-line"></div>
          <span style={{ color: '#10b981' }}>Non-stop</span>
        </div>

        <div className="time-block">
          <div className="time">{flight.arrivalTime}</div>
          <div className="location">{flight.destination}</div>
        </div>
      </div>

      <div className="price-section">
        <div className="price">₹{flight.price.toLocaleString('en-IN')}</div>
        <button className="btn-primary" style={{ width: '100%' }} onClick={() => navigate('/checkout')}>Book Now</button>
      </div>
    </div>
  );
};

export default FlightCard;
