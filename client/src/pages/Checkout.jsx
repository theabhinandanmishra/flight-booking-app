import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const flight = location.state?.flight;
  const numPassengers = flight?.passengers ? parseInt(flight.passengers, 10) : 1;
  const pricePerPerson = flight?.price || 4250;
  const totalAmount = pricePerPerson * numPassengers;

  const [passengerName, setPassengerName] = useState('Guest (Login recommended)');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [pnr, setPnr] = useState('');
  const [expandedPassenger, setExpandedPassenger] = useState(0);

  useEffect(() => {
    const authStatus = localStorage.getItem('flightfinder_auth');
    if (authStatus === 'user' || authStatus === 'admin') {
      setPassengerName('Authenticated ' + (authStatus === 'admin' ? 'Admin' : 'Passenger'));
    }
  }, []);

  const handlePayment = (e) => {
    e.preventDefault();
    setShowPayment(true);
  };

  const processPayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing and PNR generation
    setTimeout(() => {
      setPnr(Math.random().toString(36).substring(2, 8).toUpperCase());
      setIsProcessing(false);
      setShowPayment(false);
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
            {Array.from({ length: numPassengers }).map((_, idx) => (
              <div key={idx} className="passenger-section" style={{ marginBottom: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                <div 
                  style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: expandedPassenger === idx ? 'rgba(255,255,255,0.05)' : 'transparent', transition: 'background 0.3s' }}
                  onClick={() => setExpandedPassenger(expandedPassenger === idx ? -1 : idx)}
                >
                  <h3 style={{ color: 'var(--accent)', margin: 0, fontSize: '1.2rem' }}>Passenger {idx + 1} Details</h3>
                  <span style={{ color: 'var(--text-muted)' }}>{expandedPassenger === idx ? '▲' : '▼'}</span>
                </div>

                {expandedPassenger === idx && (
                  <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }} className="animate-fade-in-up delay-100">
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
                        <select className="search-input" defaultValue="" style={{ width: '100%' }} required>
                          <option value="" disabled>Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    {idx === 0 && (
                      <>
                        <h4 style={{ marginBottom: '1rem', marginTop: '1.5rem', color: 'var(--text-muted)' }}>Contact Information (Primary Passenger)</h4>
                        <div className="input-group" style={{ marginBottom: '1rem' }}>
                          <label>Email Address</label>
                          <input type="email" className="search-input" style={{ width: '100%' }} required />
                        </div>
                        <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                          <label>Phone Number</label>
                          <input type="tel" className="search-input" style={{ width: '100%' }} required pattern="[0-9]{10}" placeholder="10-digit number" />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}

            <div className="detail-box">
              <strong style={{ fontSize: '1.25rem' }}>
                Total Amount: <span style={{ color: '#10b981' }}>₹{totalAmount.toLocaleString('en-IN')}</span>
              </strong><br/>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Includes base fare for {numPassengers} passenger(s) and convenience fees
              </span>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }} disabled={isProcessing}>
              Proceed to Payment
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
          <button className="btn-checkout" style={{ padding: '0.75rem 2rem', background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '8px', cursor: 'pointer' }} onClick={() => navigate('/')}>
            Return Home
          </button>
        </div>
      )}

      {/* Mock Payment Gateway Modal */}
      {showPayment && (
        <div className="payment-modal-overlay animate-fade-in-up" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(8px)' }}>
          <div className="glass payment-modal" style={{ width: '100%', maxWidth: '420px', padding: '2rem', borderRadius: '16px', position: 'relative', border: '1px solid rgba(16, 185, 129, 0.2)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
            <button onClick={() => !isProcessing && setShowPayment(false)} style={{ position: 'absolute', top: '1rem', right: '1.5rem', background: 'transparent', color: 'var(--text-muted)', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
            <h3 style={{ marginBottom: '0.5rem', color: 'white', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#10b981' }}>🔒</span> Secure Pay
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>Test Environment Active. No real funds will be deducted.</p>
            
            <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem', textAlign: 'center' }}>
               <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Amount to Pay</div>
               <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>₹{totalAmount.toLocaleString('en-IN')}</div>
            </div>

            <div className="input-group" style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.8rem' }}>Card Number (Auto-filled Demo)</label>
              <input type="text" className="search-input" value="4111 1111 1111 1111" readOnly style={{ width: '100%', opacity: 0.7, fontFamily: 'monospace', fontSize: '1.1rem', letterSpacing: '2px' }} />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <div className="input-group" style={{ flex: 1 }}>
                <label style={{ fontSize: '0.8rem' }}>Expiry</label>
                <input type="text" className="search-input" value="12/30" readOnly style={{ width: '100%', opacity: 0.7, fontFamily: 'monospace', letterSpacing: '1px' }} />
              </div>
              <div className="input-group" style={{ flex: 1 }}>
                <label style={{ fontSize: '0.8rem' }}>CVV</label>
                <input type="text" className="search-input" value="123" readOnly style={{ width: '100%', opacity: 0.7, fontFamily: 'monospace', letterSpacing: '1px' }} />
              </div>
            </div>

            <button 
              className="btn-primary hover-glow" 
              onClick={processPayment} 
              style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', background: isProcessing ? 'var(--bg-card)' : 'linear-gradient(135deg, #10b981, #059669)' }} 
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing... ⏳' : `Pay ₹${totalAmount.toLocaleString('en-IN')} Now`}
            </button>
            <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              100% Free Sandbox Gateway
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
