import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [currentMode, setCurrentMode] = useState('user'); // 'user' or 'admin'
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get('mode') === 'signup') {
      setIsSignup(true);
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    // Simulate Authentication delay
    setTimeout(() => {
      if (currentMode === 'admin') {
        if (email !== 'mishra.ravi94@gmail.com' || password !== 'Gtet@123$') {
          alert('Invalid Admin credentials');
          setIsLoading(false);
          return;
        }
        localStorage.setItem('flightfinder_auth', 'admin');
        window.location.href = 'http://localhost:3001'; 
      } else {
        localStorage.setItem('flightfinder_auth', 'user');
        navigate('/');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="login-wrapper">
      <div className="glass login-container">
        <div className="login-logo">
          <span style={{ color: 'var(--accent)', fontSize: '1.75rem' }}>✈</span> Abhi Flight Finder
        </div>

        <div className="toggle-group">
          <button 
            className={`toggle-btn ${currentMode === 'user' ? 'active' : ''}`}
            onClick={() => setCurrentMode('user')}
            type="button"
          >
            Passenger
          </button>
          <button 
            className={`toggle-btn ${currentMode === 'admin' ? 'active' : ''}`}
            onClick={() => {
              setCurrentMode('admin');
              setIsSignup(false);
            }}
            type="button"
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="input-group" style={{ marginBottom: '1.5rem' }}>
              <label>Full Name</label>
              <input type="text" className="form-input" placeholder="John Doe" required />
            </div>
          )}

          <div className="input-group" style={{ marginBottom: '1.5rem' }}>
            <label>Email Address</label>
            <input 
              type="email" 
              name="email"
              className="form-input" 
              placeholder={currentMode === 'admin' ? 'mishra.ravi94@gmail.com' : 'name@example.com'} 
              required 
            />
          </div>
          
          <div className="input-group" style={{ marginBottom: '1.5rem' }}>
            <label>Password</label>
            <input 
              type="password" 
              name="password"
              className="form-input" 
              placeholder="••••••••" 
              required 
            />
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Authenticating...' : (
              isSignup ? 'Create Account' : (currentMode === 'admin' ? 'Admin Login' : 'Sign In')
            )}
          </button>
          
          {currentMode === 'user' && (
            <div style={{ marginTop: '1.5rem', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>
                {isSignup ? "Already have an account?" : "Don't have an account?"}
              </span>{' '}
              <button 
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 600, padding: 0 }}
              >
                {isSignup ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          )}
        </form>

        <div className="back-nav">
          &larr; <Link to="/">Back to Flights</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
