import React, { useState } from 'react';
import { FaHotel, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HotelCard from '../components/HotelCard';

const HotelBooking = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock search parameters state
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Setup mock timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockHotels = [
        {
          id: 'HTL-001',
          name: 'Taj Palace Resort & Spa',
          stars: 5,
          location: searchParams.location || 'New Delhi',
          distance: '2.5 km from city center',
          price: 15400,
          amenities: ['pool', 'wifi', 'breakfast'],
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        {
          id: 'HTL-002',
          name: 'ITC Grand Central',
          stars: 5,
          location: searchParams.location || 'Mumbai',
          distance: '1.2 km from city center',
          price: 12500,
          amenities: ['wifi', 'breakfast'],
          image: 'https://images.unsplash.com/photo-1551882547-ff40c0d13c6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        {
          id: 'HTL-003',
          name: 'Lemon Tree Premier',
          stars: 4,
          location: searchParams.location || 'Bangalore',
          distance: '4.0 km from city center',
          price: 6500,
          amenities: ['pool', 'wifi'],
          image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        {
          id: 'HTL-004',
          name: 'Novotel Seafront',
          stars: 4,
          location: searchParams.location || 'Chennai',
          distance: '0.5 km from beach',
          price: 8200,
          amenities: ['pool', 'wifi', 'breakfast'],
          image: 'https://images.unsplash.com/photo-1455587734955-081b22074eee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        }
      ];

      const sorted = mockHotels.sort((a, b) => a.price - b.price);
      setHotels(sorted);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch hotels. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Auth controls handled on PortalHome

  return (
    <div className="container">
      <header className="header animate-fade-in-up">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="logo" style={{ cursor: 'pointer' }}>
            <FaHome style={{ color: '#10b981', marginRight: '8px' }} />
            <FaHotel style={{ color: '#10b981' }} />
            <span style={{ marginLeft: '8px', background: 'linear-gradient(135deg, #10b981, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Abhi Hotel Stays</span>
          </div>
        </Link>
        <div></div>
      </header>

      {/* Hotel Search Hero */}
      <div className="hero-content animate-fade-in-up delay-100">
        <h1 className="hero-title">
          Find your perfect <span>Stay</span>
        </h1>
        <p className="hero-subtitle">
          Discover luxury hotels, resorts, and homestays worldwide at unbeatable prices.
        </p>
        
        <form onSubmit={handleSearch} className="search-card glass animate-scale-in delay-200">
          <div className="input-group">
            <label>Destination City or Hotel</label>
            <input 
              type="text" 
              className="search-input" 
              placeholder="E.g., Goa, Mumbai, Delhi"
              value={searchParams.location}
              onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
              required 
            />
          </div>
          
          <div className="input-group">
            <label>Check In</label>
            <input 
              type="date" 
              className="search-input" 
              value={searchParams.checkIn}
              onChange={(e) => setSearchParams({...searchParams, checkIn: e.target.value})}
              required 
            />
          </div>
          
          <div className="input-group">
            <label>Check Out</label>
            <input 
              type="date" 
              className="search-input" 
              value={searchParams.checkOut}
              onChange={(e) => setSearchParams({...searchParams, checkOut: e.target.value})}
              required 
            />
          </div>

          <div className="input-group" style={{ minWidth: '100px' }}>
            <label>Guests</label>
            <select 
              className="search-input"
              value={searchParams.guests}
              onChange={(e) => setSearchParams({...searchParams, guests: e.target.value})}
            >
              {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} Guest{n>1?'s':''}</option>)}
            </select>
          </div>

          <button type="submit" className="btn-primary search-btn" disabled={loading} style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)' }}>
            {loading ? 'Searching...' : 'Search Hotels'}
          </button>
        </form>
      </div>

      {error && (
        <div className="glass" style={{ padding: '1rem', color: '#ef4444', textAlign: 'center', marginTop: '1rem' }}>
          {error}
        </div>
      )}

      {hotels.length > 0 && (
        <div className="results-section">
          <div className="results-header animate-fade-in-up delay-200">
            <h2>Available Hotels</h2>
            <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
              Showing {hotels.length} properties
            </span>
          </div>
          
          <div className="flights-grid">
            {hotels.map((hotel, index) => (
              <HotelCard 
                key={hotel.id} 
                hotel={hotel} 
                isRecommended={index === 0}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelBooking;
