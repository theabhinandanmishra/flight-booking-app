import React, { useState } from 'react';
import { FaUtensils, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DineInCard from '../components/DineInCard';

const DineInBooking = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock search parameters state
  const [searchParams, setSearchParams] = useState({
    location: '',
    date: '',
    time: '',
    guests: 2
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Setup mock timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockRestaurants = [
        {
          id: 'RES-001',
          name: 'The Golden Plate',
          cuisine: 'North Indian, Mughlai',
          rating: 4.9,
          location: searchParams.location || 'Connaught Place, New Delhi',
          costForTwo: '₹3,500',
          tags: ['Fine Dining', 'Live Music', 'Luxury'],
          image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        {
          id: 'RES-002',
          name: 'Ocean View Bistro',
          cuisine: 'Continental, Seafood',
          rating: 4.7,
          location: searchParams.location || 'Marine Drive, Mumbai',
          costForTwo: '₹4,200',
          tags: ['Sea View', 'Romantic', 'Rooftop'],
          image: 'https://images.unsplash.com/photo-1414235077428-97896499c52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        {
          id: 'RES-003',
          name: 'Saffron Spice',
          cuisine: 'South Indian, Chettinad',
          rating: 4.5,
          location: searchParams.location || 'Indiranagar, Bangalore',
          costForTwo: '₹2,000',
          tags: ['Authentic', 'Family Dining'],
          image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        {
          id: 'RES-004',
          name: 'Zenith Pan-Asian',
          cuisine: 'Chinese, Japanese, Thai',
          rating: 4.8,
          location: searchParams.location || 'Banjara Hills, Hyderabad',
          costForTwo: '₹3,000',
          tags: ['Sushi Bar', 'Premium', 'Cocktails'],
          image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        }
      ];

      const sorted = mockRestaurants.sort((a, b) => b.rating - a.rating);
      setRestaurants(sorted);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch restaurants. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Auth controls handled on PortalHome

  return (
    <div className="container" style={{ paddingBottom: '3rem' }}>
      <header className="header animate-fade-in-up">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="logo" style={{ cursor: 'pointer' }}>
            <FaHome style={{ color: '#f59e0b', marginRight: '8px' }} />
            <FaUtensils style={{ color: '#f59e0b' }} />
            <span style={{ marginLeft: '8px', background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Abhi Dine In</span>
          </div>
        </Link>
        <div></div>
      </header>

      {/* Dine In Search Hero */}
      <div className="hero-content animate-fade-in-up delay-100">
        <h1 className="hero-title">
          Reserve Culinary <span>Experiences</span>
        </h1>
        <p className="hero-subtitle">
          Discover and book tables at the finest restaurants, cafes, and luxury dinings.
        </p>
        
        <form onSubmit={handleSearch} className="search-card glass animate-scale-in delay-200">
          <div className="input-group">
            <label>Location / Restaurant</label>
            <input 
              type="text" 
              className="search-input" 
              placeholder="E.g., Connaught Place, Mumbai"
              value={searchParams.location}
              onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
              required 
            />
          </div>
          
          <div className="input-group">
            <label>Date</label>
            <input 
              type="date" 
              className="search-input" 
              value={searchParams.date}
              onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
              required 
            />
          </div>
          
          <div className="input-group">
            <label>Time</label>
            <input 
              type="time" 
              className="search-input" 
              value={searchParams.time}
              onChange={(e) => setSearchParams({...searchParams, time: e.target.value})}
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
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n} Person{n>1?'s':''}</option>)}
            </select>
          </div>

          <button type="submit" className="btn-primary search-btn" disabled={loading} style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)' }}>
            {loading ? 'Searching...' : 'Find Tables'}
          </button>
        </form>
      </div>

      {error && (
        <div className="glass" style={{ padding: '1rem', color: '#ef4444', textAlign: 'center', marginTop: '1rem' }}>
          {error}
        </div>
      )}

      {restaurants.length > 0 && (
        <div className="results-section">
          <div className="results-header animate-fade-in-up delay-200">
            <h2>Featured Restaurants</h2>
            <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
              Found {restaurants.length} places
            </span>
          </div>
          
          <div className="flights-grid">
            {restaurants.map((restaurant, index) => (
              <DineInCard 
                key={restaurant.id} 
                restaurant={restaurant} 
                isFeatured={index === 0}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DineInBooking;
