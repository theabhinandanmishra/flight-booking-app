import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlane, FaHotel, FaUtensils, FaTrain, FaBus, FaCompass, FaMagic } from 'react-icons/fa';

const PortalHome = () => {
  const navigate = useNavigate();
  const [aiQuery, setAiQuery] = useState('');

  const handleAiSearch = (e) => {
    e.preventDefault();
    if (aiQuery.trim()) {
      navigate(`/ai-planner?q=${encodeURIComponent(aiQuery)}`);
    }
  };

  const cards = [
    {
      title: 'Flights',
      description: 'Book domestic and international flights at the best prices.',
      icon: <FaPlane />,
      link: '/flights',
      color: '#3b82f6', // Blue
      gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.05))',
      delay: '0ms'
    },
    {
      title: 'Hotel Stays',
      description: 'Find premium hotels, resorts, and homestays globally.',
      icon: <FaHotel />,
      link: '/hotels',
      color: '#10b981', // Emerald
      gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.05))',
      delay: '100ms'
    },
    {
      title: 'Dine In',
      description: 'Reserve tables at top-rated restaurants near you.',
      icon: <FaUtensils />,
      link: '/dine-in',
      color: '#f59e0b', // Amber
      gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.05))',
      delay: '200ms'
    },
    {
      title: 'Train Tickets',
      description: 'Check schedules and book train tickets seamlessly.',
      icon: <FaTrain />,
      link: '/trains',
      color: '#8b5cf6', // Violet
      gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.05))',
      delay: '300ms'
    },
    {
      title: 'Bus Tickets',
      description: 'Convenient bus travel options across all major routes.',
      icon: <FaBus />,
      link: '/buses',
      color: '#ef4444', // Red
      gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.05))',
      delay: '400ms'
    }
  ];

  const authStatus = localStorage.getItem('flightfinder_auth');

  const logout = () => {
    localStorage.removeItem('flightfinder_auth');
    window.location.reload();
  };

  return (
    <div className="container" style={{ paddingBottom: '3rem' }}>
      <header className="header portal-header animate-fade-in-up">
        <div className="logo cursor-default">
          <FaCompass style={{ color: '#ec4899', marginRight: '8px' }} />
          Abhi Booking Portal
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {authStatus ? (
             <>
               <span style={{ color: 'white', fontWeight: 500 }}>
                 Hello, {authStatus.charAt(0).toUpperCase() + authStatus.slice(1)}
               </span>
               <button onClick={logout} className="glass" style={{ padding: '0.5rem 1rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                 Sign Out
               </button>
             </>
          ) : (
             <>
               <Link to="/login" className="glass" style={{ padding: '0.5rem 1rem', textDecoration: 'none', color: 'white' }}>Sign In</Link>
               <Link to="/login?mode=signup" className="btn-primary" style={{ padding: '0.5rem 1rem', textDecoration: 'none', borderRadius: '8px', color: 'white' }}>Sign Up</Link>
             </>
          )}
        </div>
      </header>

      <div className="portal-hero animate-fade-in-up" style={{ textAlign: 'center', margin: '4rem 0' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(to right, #22d3ee, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Where would you like to go tomorrow?
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', marginBottom: '2rem' }}>
          Discover the world with our premium booking services. Explore flights, stays, dining, and more.
        </p>

        <form onSubmit={handleAiSearch} className="ai-planner-form">
          <div className="ai-input-wrapper glass">
            <FaMagic className="ai-icon" />
            <input 
              type="text" 
              placeholder="e.g. Plan a 3-day trip to BLR..." 
              className="ai-input"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
            />
            <button type="submit" className="ai-submit-btn">
              Let AI Plan It ✨
            </button>
          </div>
        </form>
      </div>

      <div className="portal-grid">
        {cards.map((card, idx) => (
          <Link 
            to={card.link} 
            key={idx} 
            className="portal-card animate-fade-in-up"
            style={{ 
              animationDelay: card.delay,
              textDecoration: 'none',
            }}
          >
            <div className="portal-card-inner" style={{ background: card.gradient }}>
              <div className="portal-icon-wrapper" style={{ color: card.color, borderColor: card.color }}>
                {card.icon}
              </div>
              <h2 className="portal-card-title">{card.title}</h2>
              <p className="portal-card-desc">{card.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PortalHome;
