import React from 'react';
import { FaBus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BusCard = ({ bus, isRecommended, index }) => {
  const navigate = useNavigate();
  return (
    <div className={`flight-card glass animate-fade-in-up delay-${(index % 5 + 1) * 100}`}>
      {isRecommended && (
        <div className="cheapest-badge" style={{ background: '#ef4444', boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)' }}>
          ★ Top Rated
        </div>
      )}
      
      <div className="airline-info">
        <div className="airline-logo" style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
          <FaBus />
        </div>
        <div>
          <div className="airline-name">{bus.operator}</div>
          <div className="flight-number">{bus.busType}</div>
          <div style={{ color: '#f59e0b', fontSize: '0.8rem', marginTop: '0.25rem' }}>★ {bus.rating}</div>
        </div>
      </div>

      <div className="flight-times">
        <div className="time-block">
          <div className="time">{bus.departureTime}</div>
          <div className="location">{bus.origin}</div>
        </div>
        
        <div className="duration">
          <span>{bus.duration}</span>
          <div className="flight-line" style={{ background: 'rgba(239, 68, 68, 0.2)' }}>
             <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#ef4444', background: 'var(--bg-card)', padding: '0 4px', fontSize: '10px' }}>
                ●▬▬●
             </span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{bus.seatsAvailable} Seats Left</span>
        </div>

        <div className="time-block">
          <div className="time">{bus.arrivalTime}</div>
          <div className="location">{bus.destination}</div>
        </div>
      </div>

      <div className="price-section">
        <div className="price" style={{ color: '#ef4444' }}>₹{bus.price.toLocaleString()}</div>
        <button 
          className="btn-primary" 
          onClick={() => navigate('/checkout', { state: { item: bus, type: 'Bus Ticket' } })}
          style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)', boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)' }}
        >
          Select Seats
        </button>
      </div>
    </div>
  );
};

export default BusCard;
