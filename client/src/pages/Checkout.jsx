import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const [passengerName, setPassengerName] = useState('Guest (Login recommended)');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [pnr, setPnr] = useState('');

  useEffect(() => {
    const authStatus = localStorage.getItem('flightfinder_auth');
    if (authStatus === 'user' || authStatus === 'admin') {
      setPassengerName('Authenticated ' + (authStatus === 'admin' ? 'Admin' : 'Passenger'));
    }
  }, []);

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing and PNR generation
    setTimeout(() => {
      setPnr(Math.random().toString(36).substring(2, 8).toUpperCase());
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="checkout-wrapper">
      <div className="checkout-logo">✈ Abhi Flight Finder Checkout</div>

      {!isSuccess ? (
        <div className="glass checkout-container">
          <h2 style={{ marginBottom: '1rem' }}>Complete Your Booking</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Secure checkout process for your selected flight.
          </p>
          
          <form className="checkout-form" onSubmit={handlePayment}>
            <div className="input-group" style={{ marginBottom: '1rem' }}>
              <label>First Name</label>
              <input type="text" className="search-input" style={{ width: '100%' }} required />
            </div>
            <div className="input-group" style={{ marginBottom: '1rem' }}>
              <label>Last Name</label>
              <input type="text" className="search-input" style={{ width: '100%' }} required />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div className="input-group" style={{ flex: 1 }}>
                <label>Age</label>
                <input type="number" className="search-input" min="1" max="120" style={{ width: '100%' }} required />
              </div>
              <div className="input-group" style={{ flex: 1 }}>
                <label>Gender</label>
                <select className="search-input" style={{ width: '100%' }} required>
                  <option value="" disabled selected>Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="input-group" style={{ marginBottom: '1rem' }}>
              <label>Email Address</label>
              <input type="email" className="search-input" style={{ width: '100%' }} required />
            </div>
            <div className="input-group" style={{ marginBottom: '1.5rem' }}>
              <label>Phone Number</label>
              <input type="tel" className="search-input" style={{ width: '100%' }} required pattern="[0-9]{10}" placeholder="10-digit number" />
            </div>

            <div className="detail-box">
              <strong style={{ fontSize: '1.25rem' }}>
                Total Amount: <span style={{ color: '#10b981' }}>₹4,250</span>
              </strong><br/>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Includes base fare and convenience fees
              </span>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }} disabled={isProcessing}>
              {isProcessing ? 'Securing Tickets...' : 'Confirm Processing'}
            </button>
          </form>
          
          <div style={{ marginTop: '1rem' }}>
            <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>
              Cancel Booking
            </Link>
          </div>
        </div>
      ) : (
        <div className="glass checkout-container success-flow">
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ color: '#10b981', marginBottom: '1rem' }}>Booking Confirmed!</h2>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
             <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Your PNR Number</p>
             <h1 style={{ letterSpacing: '4px', color: 'white', margin: '0' }}>{pnr}</h1>
          </div>
          <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>
            Your digital tickets and itinerary have been securely sent to your email.
          </p>
          <button className="btn-checkout" onClick={() => navigate('/')}>
            Return Home
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
