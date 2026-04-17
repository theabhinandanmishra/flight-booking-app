import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PnrStatus = () => {
  const [pnr, setPnr] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'loading', 'found', 'error'
  const [mockData, setMockData] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    setTimeout(() => {
      // Simulate backend check - assume 6 char PNR constitutes a valid booking for demo purposes
      if(pnr.length === 6) {
        setMockData({
          pnr: pnr.toUpperCase(),
          status: 'CONFIRMED',
          flight: 'INDIGO 6E-234',
          route: 'DEL → BOM',
          date: '01-05-2026',
          passenger: 'Authenticated Passenger'
        });
        setStatus('found');
      } else {
        setStatus('error');
      }
    }, 1200);
  };

  return (
    <div className="checkout-wrapper">
      <div className="checkout-logo">✈ Abhi Flight Finder PNR</div>
      
      <div className="glass checkout-container" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>Check PNR Status</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', textAlign: 'center' }}>
          Retrieve your latest booking status and itinerary details instantly.
        </p>

        <form onSubmit={handleCheck} style={{ display: status === 'found' ? 'none' : 'block' }}>
          <div className="input-group" style={{ marginBottom: '1rem' }}>
            <label>PNR Number</label>
            <input 
              type="text" 
              className="search-input" 
              style={{ width: '100%', textTransform: 'uppercase' }} 
              placeholder="e.g. Y6TH8Q"
              maxLength={6}
              value={pnr}
              onChange={(e) => setPnr(e.target.value)}
              required 
            />
          </div>
          
          <div className="input-group" style={{ marginBottom: '1.5rem' }}>
            <label>Email Address</label>
            <input 
              type="email" 
              className="search-input" 
              style={{ width: '100%' }} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          {status === 'error' && (
            <div className="animate-fade-in-up" style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px' }}>
               We couldn't find a booking with that PNR. Please check your details and try again.
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem' }} disabled={status === 'loading'}>
            {status === 'loading' ? 'Searching Database...' : 'Check Status'}
          </button>
        </form>

        {status === 'found' && mockData && (
          <div className="animate-fade-in-up">
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                 <span style={{ color: 'var(--text-muted)' }}>Status</span>
                 <span style={{ background: '#10b981', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>{mockData.status}</span>
               </div>
               <h3 style={{ letterSpacing: '2px', color: 'white', marginBottom: '1rem' }}>PNR: {mockData.pnr}</h3>
               <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                 <p><strong>Passenger:</strong> {mockData.passenger}</p>
                 <p><strong>Flight:</strong> {mockData.flight}</p>
                 <p><strong>Route:</strong> {mockData.route}</p>
                 <p><strong>Date:</strong> {mockData.date}</p>
               </div>
            </div>
            <button className="btn-primary" style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)' }} onClick={() => { setStatus(null); setPnr(''); }}>
              Check Another PNR
            </button>
          </div>
        )}

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PnrStatus;
