import React, { useState } from 'react';

const DOMESTIC_AIRPORTS = [
  { code: 'DEL', name: 'New Delhi (DEL)' },
  { code: 'BOM', name: 'Mumbai (BOM)' },
  { code: 'BLR', name: 'Bengaluru (BLR)' },
  { code: 'HYD', name: 'Hyderabad (HYD)' },
  { code: 'MAA', name: 'Chennai (MAA)' },
  { code: 'CCU', name: 'Kolkata (CCU)' },
  { code: 'AMD', name: 'Ahmedabad (AMD)' },
  { code: 'PNQ', name: 'Pune (PNQ)' },
  { code: 'GOI', name: 'Goa (GOI)' },
  { code: 'COK', name: 'Kochi (COK)' },
  { code: 'JAI', name: 'Jaipur (JAI)' },
  { code: 'LKO', name: 'Lucknow (LKO)' },
  { code: 'ATQ', name: 'Amritsar (ATQ)' },
  { code: 'IXB', name: 'Bagdogra (IXB)' },
  { code: 'BBI', name: 'Bhubaneswar (BBI)' },
  { code: 'CJB', name: 'Coimbatore (CJB)' },
  { code: 'GAU', name: 'Guwahati (GAU)' },
  { code: 'IDR', name: 'Indore (IDR)' },
  { code: 'NAG', name: 'Nagpur (NAG)' },
  { code: 'PAT', name: 'Patna (PAT)' },
  { code: 'TRV', name: 'Thiruvananthapuram (TRV)' },
  { code: 'IXC', name: 'Chandigarh (IXC)' }
];

const HeroSearch = ({ onSearch, loading }) => {
  const [origin, setOrigin] = useState('DEL');
  const [destination, setDestination] = useState('BOM');
  const [date, setDate] = useState('2026-05-01');
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState('Economy');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(origin && destination && date) {
      onSearch({ origin, destination, date, passengers, cabinClass });
    }
  };

  return (
    <div className="hero-content animate-fade-in-up">
      <h1 className="hero-title">
        Find The <span>Cheapest</span> Flights
      </h1>
      <p className="hero-subtitle">
        Experience premium bookings without the premium price tag. Compare and book top airlines instantly.
      </p>

      <form className="glass search-card animate-fade-in-up delay-100" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>From</label>
          <select 
            className="search-input" 
            value={origin} 
            onChange={(e) => setOrigin(e.target.value)}
            required
          >
            <option value="" disabled>Select Origin</option>
            {DOMESTIC_AIRPORTS.map(apt => (
              <option key={apt.code} value={apt.code}>{apt.name}</option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>To</label>
          <select 
            className="search-input" 
            value={destination} 
            onChange={(e) => setDestination(e.target.value)}
            required
          >
            <option value="" disabled>Select Destination</option>
            {DOMESTIC_AIRPORTS.map(apt => (
              <option key={apt.code} value={apt.code}>{apt.name}</option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>Departure</label>
          <input 
            type="date" 
            className="search-input" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="input-group" style={{ minWidth: '100px', flex: '0.5' }}>
          <label>Travellers</label>
          <select 
            className="search-input" 
            value={passengers} 
            onChange={(e) => setPassengers(e.target.value)}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>Class</label>
          <select 
            className="search-input" 
            value={cabinClass} 
            onChange={(e) => setCabinClass(e.target.value)}
          >
            <option value="Economy">Economy</option>
            <option value="Premium Economy">Premium</option>
            <option value="Business">Business</option>
            <option value="First Class">First Class</option>
          </select>
        </div>
        <button type="submit" className="btn-primary search-btn hover-glow" disabled={loading}>
          {loading ? 'Searching...' : 'Search Flights'}
        </button>
      </form>
    </div>
  );
};

export default HeroSearch;
