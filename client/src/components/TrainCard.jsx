import React from 'react';
import { FaTrain } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TrainCard = ({ train, isFastest, index }) => {
  const navigate = useNavigate();
  return (
    <div className={`flight-card glass animate-fade-in-up delay-${(index % 5 + 1) * 100}`}>
      {isFastest && (
        <div className="cheapest-badge" style={{ background: '#8b5cf6', boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)' }}>
          ⚡ Fastest
        </div>
      )}
      
      <div className="airline-info">
        <div className="airline-logo" style={{ color: '#8b5cf6', borderColor: 'rgba(139, 92, 246, 0.3)' }}>
          <FaTrain />
        </div>
        <div>
          <div className="airline-name">{train.name}</div>
          <div className="flight-number">{train.trainNumber} • {train.trainClass}</div>
        </div>
      </div>

      <div className="flight-times">
        <div className="time-block">
          <div className="time">{train.departureTime}</div>
          <div className="location">{train.origin}</div>
        </div>
        
        <div className="duration">
          <span>{train.duration}</span>
          <div className="flight-line" style={{ background: 'rgba(139, 92, 246, 0.2)' }}>
             <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#8b5cf6', background: 'var(--bg-card)', padding: '0 4px', fontSize: '10px' }}>
                ●▬▬●
             </span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Direct</span>
        </div>

        <div className="time-block">
          <div className="time">{train.arrivalTime}</div>
          <div className="location">{train.destination}</div>
        </div>
      </div>

      <div className="price-section">
        <div className="price" style={{ color: '#8b5cf6' }}>₹{train.price.toLocaleString()}</div>
        <button 
          className="btn-primary" 
          onClick={() => navigate('/checkout', { state: { item: train, type: 'Train Ticket' } })}
          style={{ background: 'linear-gradient(135deg, #8b5cf6, #c084fc)', boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)' }}
        >
          Book Ticket
        </button>
      </div>
    </div>
  );
};

export default TrainCard;
