import React, { useState } from 'react';
import axios from 'axios';
import { FaPlane, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HeroSearch from '../components/HeroSearch';
import FlightCard from '../components/FlightCard';

const FlightBooking = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchParams) => {
    setLoading(true);
    setError(null);
    try {
      // Setup mock timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const airlines = [
        { name: "IndiGo", logo: "6E" },
        { name: "Air India", logo: "AI" },
        { name: "Vistara", logo: "UK" },
        { name: "SpiceJet", logo: "SG" },
        { name: "Akasa Air", logo: "QP" }
      ];

      const generateRandomTime = (baseHour) => {
        const h = (baseHour + Math.floor(Math.random() * 3)) % 24;
        const m = Math.floor(Math.random() * 60);
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      };

      const mockFlights = Array.from({ length: 6 }).map((_, i) => {
        const airlineCode = airlines[i % airlines.length];
        const baseHour = 6 + i * 2;
        return {
          id: `FL-${airlineCode.logo}-${Math.floor(Math.random() * 9000) + 1000}`,
          airline: airlineCode.name,
          flightNumber: `${airlineCode.logo}-${Math.floor(Math.random() * 900) + 100}`,
          departureTime: generateRandomTime(baseHour),
          arrivalTime: generateRandomTime(baseHour + 2),
          duration: "2h 15m",
          price: Math.floor(Math.random() * 5000) + 3000, 
          origin: searchParams.origin || 'DEL',
          destination: searchParams.destination || 'BOM',
          date: searchParams.date,
          passengers: searchParams.passengers || 1,
          cabinClass: searchParams.cabinClass || 'Economy'
        };
      });

      const sorted = mockFlights.sort((a, b) => a.price - b.price);
      setFlights(sorted);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch flights. Please ensure the backend is running.");
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
            <FaHome style={{ color: '#22d3ee', marginRight: '8px' }} />
            <FaPlane style={{ color: '#22d3ee' }} />
            <span style={{ marginLeft: '8px' }}>Abhi Flight Finder</span>
          </div>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/pnr" className="glass" style={{ padding: '0.5rem 1rem', textDecoration: 'none', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)', fontWeight: 'bold' }}>
            Check PNR
          </Link>
        </div>
      </header>

      <HeroSearch onSearch={handleSearch} loading={loading} />

      {error && (
        <div className="glass" style={{ padding: '1rem', color: '#ef4444', textAlign: 'center', marginTop: '1rem' }}>
          {error}
        </div>
      )}

      {flights.length > 0 && (
        <div className="results-section">
          <div className="results-header animate-fade-in-up delay-200">
            <h2>Available Flights</h2>
            <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
              Showing {flights.length} flights
            </span>
          </div>
          
          <div className="flights-grid">
            {flights.map((flight, index) => (
              <FlightCard 
                key={flight.id} 
                flight={flight} 
                isCheapest={index === 0}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightBooking;
