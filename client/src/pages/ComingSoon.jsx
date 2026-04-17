import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaTools } from 'react-icons/fa';

const ComingSoon = () => {
  const location = useLocation();
  const pathName = location.pathname.substring(1);
  const title = pathName.charAt(0).toUpperCase() + pathName.slice(1);

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <div className="glass animate-fade-in-up" style={{ padding: '3rem', textAlign: 'center', maxWidth: '500px', width: '100%' }}>
        <FaTools style={{ fontSize: '4rem', color: '#8b5cf6', marginBottom: '1.5rem' }} />
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', background: 'linear-gradient(to right, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {title} Coming Soon
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
          We are working hard to bring you the best {title.toLowerCase()} booking experience. Stay tuned!
        </p>
        <Link to="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 'bold' }}>
          <FaHome /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
