import React, { useState } from 'react';
import { FaBus, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import BusCard from '../components/BusCard';

const BusBooking = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock search parameters state
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    date: '',
    busType: 'All Types'
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Setup mock timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockBuses = [
        {
          id: 'BUS-101',
          operator: 'IntrCity SmartBus',
          busType: 'Volvo AC Sleeper (2+1)',
          rating: 4.8,
          origin: searchParams.origin || 'Bangalore',
          destination: searchParams.destination || 'Hyderabad',
          departureTime: '21:30',
          arrivalTime: '06:00',
          duration: '8h 30m',
          seatsAvailable: 12,
          price: 1450,
        },
        {
          id: 'BUS-102',
          operator: 'Orange Travels',
          busType: 'Scania AC Multi-Axle Sleeper',
          rating: 4.5,
          origin: searchParams.origin || 'Bangalore',
          destination: searchParams.destination || 'Hyderabad',
          departureTime: '22:15',
          arrivalTime: '07:10',
          duration: '8h 55m',
          seatsAvailable: 4,
          price: 1200,
        },
        {
          id: 'BUS-103',
          operator: 'VRL Travels',
          busType: 'AC Semi-Sleeper (2+2)',
          rating: 4.2,
          origin: searchParams.origin || 'Bangalore',
          destination: searchParams.destination || 'Hyderabad',
          departureTime: '20:00',
          arrivalTime: '05:30',
          duration: '9h 30m',
          seatsAvailable: 22,
          price: 850,
        }
      ];

      const sorted = mockBuses.sort((a, b) => b.rating - a.rating);
      setBuses(sorted);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch buses. Please check your connection.");
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
            <FaHome style={{ color: '#ef4444', marginRight: '8px' }} />
            <FaBus style={{ color: '#ef4444' }} />
            <span style={{ marginLeft: '8px', background: 'linear-gradient(135deg, #ef4444, #f87171)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Abhi Bus Tickets</span>
          </div>
        </Link>
        <div></div>
      </header>

      {/* Bus Search Hero */}
      <div className="hero-content animate-fade-in-up delay-100">
        <h1 className="hero-title">
          Hit the road with <span>Comfort</span>
        </h1>
        <p className="hero-subtitle">
          Book premium Volvo and Sleeper buses for your intercity travel needs.
        </p>
        
        <form onSubmit={handleSearch} className="search-card glass animate-scale-in delay-200">
          <div className="input-group">
            <label>Leaving From</label>
            <input 
              type="text" 
              className="search-input" 
              placeholder="E.g., Bangalore"
              value={searchParams.origin}
              onChange={(e) => setSearchParams({...searchParams, origin: e.target.value})}
              required 
            />
          </div>
          
          <div className="input-group">
            <label>Going To</label>
            <input 
              type="text" 
              className="search-input" 
              placeholder="E.g., Hyderabad"
              value={searchParams.destination}
              onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})}
              required 
            />
          </div>

          <div className="input-group">
            <label>Date of Journey</label>
            <input 
              type="date" 
              className="search-input" 
              value={searchParams.date}
              onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
              required 
            />
          </div>

          <div className="input-group" style={{ minWidth: '150px' }}>
            <label>Bus Type</label>
            <select 
              className="search-input"
              value={searchParams.busType}
              onChange={(e) => setSearchParams({...searchParams, busType: e.target.value})}
            >
              <option value="All Types">All Types</option>
              <option value="AC Sleeper">AC Sleeper</option>
              <option value="AC Semi-Sleeper">AC Semi-Sleeper</option>
              <option value="Non-AC Sleeper">Non-AC Sleeper</option>
            </select>
          </div>

          <button type="submit" className="btn-primary search-btn" disabled={loading} style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)', boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)' }}>
            {loading ? 'Searching...' : 'Search Buses'}
          </button>
        </form>
      </div>

      {error && (
        <div className="glass" style={{ padding: '1rem', color: '#ef4444', textAlign: 'center', marginTop: '1rem' }}>
          {error}
        </div>
      )}

      {buses.length > 0 && (
        <div className="results-section">
          <div className="results-header animate-fade-in-up delay-200">
            <h2>Available Buses</h2>
            <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
              Showing {buses.length} options
            </span>
          </div>
          
          <div className="flights-grid">
            {buses.map((bus, index) => (
              <BusCard 
                key={bus.id} 
                bus={bus} 
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

export default BusBooking;
