import React from 'react';
import { FaStar, FaMapMarkerAlt, FaSwimmingPool, FaWifi, FaCoffee } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HotelCard = ({ hotel, isRecommended, index }) => {
  const navigate = useNavigate();
  return (
    <div 
      className={`flight-card hotel-card glass animate-fade-in-up delay-${(index % 5 + 1) * 100}`}
    >
      {isRecommended && (
        <div className="cheapest-badge" style={{ background: '#f59e0b', boxShadow: '0 0 10px rgba(245, 158, 11, 0.3)' }}>
          ★ Top Pick
        </div>
      )}
      
      <div className="hotel-card-img"
        style={{ 
          minHeight: '150px', 
          borderRadius: '12px', 
          backgroundImage: `url(${hotel.image})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }} 
      />

      <div className="hotel-card-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0.5rem 0' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{hotel.name}</h3>
            <div style={{ display: 'flex', color: '#f59e0b', fontSize: '0.8rem' }}>
              {[...Array(hotel.stars)].map((_, i) => <FaStar key={i} />)}
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
            <FaMapMarkerAlt />
            <span>{hotel.location}</span>
            <span style={{ margin: '0 0.5rem' }}>•</span>
            <span>{hotel.distance}</span>
          </div>

          <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {hotel.amenities.includes('pool') && <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><FaSwimmingPool /> Pool</span>}
            {hotel.amenities.includes('wifi') && <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><FaWifi /> Free WiFi</span>}
            {hotel.amenities.includes('breakfast') && <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><FaCoffee /> Breakfast</span>}
          </div>
        </div>
      </div>

      <div className="price-section" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', minWidth: '150px', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '1.5rem' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Price per night</div>
        <div className="price" style={{ color: '#10b981', marginBottom: '1rem' }}>₹{hotel.price.toLocaleString()}</div>
        <button 
          className="btn-primary" 
          style={{ width: '100%', padding: '0.5rem' }}
          onClick={() => navigate('/checkout', { state: { item: hotel, type: 'Hotel Stay' } })}
        >
          Book Room
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
