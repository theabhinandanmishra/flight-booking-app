import React, { useState } from 'react';
import { FaTrain, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import TrainCard from '../components/TrainCard';

const TrainBooking = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock search parameters state
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    date: '',
    passengers: 1,
    trainClass: 'All Classes'
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Setup mock timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockTrains = [
        {
          id: 'TRN-12001',
          name: 'Vande Bharat Express',
          trainNumber: '22436',
          trainClass: searchParams.trainClass === 'All Classes' ? 'CC' : searchParams.trainClass,
          origin: searchParams.origin || 'New Delhi',
          destination: searchParams.destination || 'Varanasi',
          departureTime: '06:00',
          arrivalTime: '14:00',
          duration: '8h 00m',
          price: 1850,
        },
        {
          id: 'TRN-12952',
          name: 'Rajdhani Express',
          trainNumber: '12952',
          trainClass: searchParams.trainClass === 'All Classes' ? '3A' : searchParams.trainClass,
          origin: searchParams.origin || 'New Delhi',
          destination: searchParams.destination || 'Mumbai Central',
          departureTime: '16:55',
          arrivalTime: '08:35',
          duration: '15h 40m',
          price: 2950,
        },
        {
          id: 'TRN-12003',
          name: 'Shatabdi Express',
          trainNumber: '12003',
          trainClass: searchParams.trainClass === 'All Classes' ? 'EC' : searchParams.trainClass,
          origin: searchParams.origin || 'Lucknow',
          destination: searchParams.destination || 'New Delhi',
          departureTime: '15:30',
          arrivalTime: '22:15',
          duration: '6h 45m',
          price: 1350,
        },
        {
          id: 'TRN-12229',
          name: 'Lucknow Mail',
          trainNumber: '12229',
          trainClass: searchParams.trainClass === 'All Classes' ? '2A' : searchParams.trainClass,
          origin: searchParams.origin || 'Lucknow',
          destination: searchParams.destination || 'New Delhi',
          departureTime: '22:00',
          arrivalTime: '06:55',
          duration: '8h 55m',
          price: 1100,
        }
      ];

      const sorted = mockTrains.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
      setTrains(sorted);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch trains. Please check your connection.");
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
            <FaHome style={{ color: '#8b5cf6', marginRight: '8px' }} />
            <FaTrain style={{ color: '#8b5cf6' }} />
            <span style={{ marginLeft: '8px', background: 'linear-gradient(135deg, #8b5cf6, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Abhi Train Tickets</span>
          </div>
        </Link>
        <div></div>
      </header>

      {/* Train Search Hero */}
      <div className="hero-content animate-fade-in-up delay-100">
        <h1 className="hero-title">
          Book seamless <span>Journeys</span>
        </h1>
        <p className="hero-subtitle">
          Experience the incredible railway network with fast and secure ticket booking.
        </p>
        
        <form onSubmit={handleSearch} className="search-card glass animate-scale-in delay-200">
          <div className="input-group">
            <label>From Station</label>
            <input 
              type="text" 
              className="search-input" 
              placeholder="E.g., NDLS, BCT"
              value={searchParams.origin}
              onChange={(e) => setSearchParams({...searchParams, origin: e.target.value})}
              required 
            />
          </div>
          
          <div className="input-group">
            <label>To Station</label>
            <input 
              type="text" 
              className="search-input" 
              placeholder="E.g., HWH, MAS"
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

          <div className="input-group" style={{ minWidth: '100px' }}>
            <label>Class</label>
            <select 
              className="search-input"
              value={searchParams.trainClass}
              onChange={(e) => setSearchParams({...searchParams, trainClass: e.target.value})}
            >
              {['All Classes', '1A', '2A', '3A', 'SL', 'CC', 'EC'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <button type="submit" className="btn-primary search-btn" disabled={loading} style={{ background: 'linear-gradient(135deg, #8b5cf6, #c084fc)', boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)' }}>
            {loading ? 'Searching...' : 'Search Trains'}
          </button>
        </form>
      </div>

      {error && (
        <div className="glass" style={{ padding: '1rem', color: '#ef4444', textAlign: 'center', marginTop: '1rem' }}>
          {error}
        </div>
      )}

      {trains.length > 0 && (
        <div className="results-section">
          <div className="results-header animate-fade-in-up delay-200">
            <h2>Available Trains</h2>
            <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
              Showing {trains.length} trains
            </span>
          </div>
          
          <div className="flights-grid">
            {trains.map((train, index) => (
              <TrainCard 
                key={train.id} 
                train={train} 
                isFastest={index === 0}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainBooking;
