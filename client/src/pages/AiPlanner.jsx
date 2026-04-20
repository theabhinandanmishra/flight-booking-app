import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaBrain, FaPlane, FaHotel, FaUtensils, FaCamera, FaCheckCircle, FaSpinner, FaArrowRight } from 'react-icons/fa';

const AiPlanner = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || 'your dream destination';
  
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisStep, setAnalysisStep] = useState(0);

  const steps = [
    "Analyzing your travel preferences...",
    "Scanning global flight routes...",
    "Curating premium hotel selections...",
    "Building your personalized itinerary...",
    "Finalizing your trip to perfection!"
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    // Simulate AI thinking process
    const stepInterval = setInterval(() => {
      setAnalysisStep(prev => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(stepInterval);
        return prev;
      });
    }, 800);

    const finishTimeout = setTimeout(() => {
      setIsAnalyzing(false);
    }, 4500);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(finishTimeout);
    };
  }, []);

  // Parse destination a bit loosely from the query if possible, or just mock it
  const destinationMatch = query.match(/to\s+([a-zA-Z]+)/i);
  const destination = destinationMatch ? destinationMatch[1].toUpperCase() : "DEL";

  // Mock Itinerary Data based on the generated destination
  const itinerary = {
    destination: destination,
    duration: '3 Days, 2 Nights',
    totalEstimatedCost: '₹42,500',
    days: [
      {
        dayNumber: 1,
        title: "Arrival & City Immersion",
        items: [
          {
            type: "flight",
            icon: <FaPlane />,
            title: `Outbound Flight to ${destination}`,
            desc: "Premium Economy, Morning Departure. 2h 15m direct flight.",
            price: "₹8,500",
            action: "/flights",
            color: "#3b82f6"
          },
          {
            type: "hotel",
            icon: <FaHotel />,
            title: "Check-in at The Grand Plaza",
            desc: "5-Star Luxury Suite with City View.",
            price: "₹15,000 / night",
            action: "/hotels",
            color: "#10b981"
          },
          {
            type: "dine",
            icon: <FaUtensils />,
            title: "Dinner at Cloud 9",
            desc: "Rooftop dining experience featuring local delicacies.",
            price: "₹3,500",
            action: "/dine-in",
            color: "#f59e0b"
          }
        ]
      },
      {
        dayNumber: 2,
        title: "Exploration & Leisure",
        items: [
          {
            type: "activity",
            icon: <FaCamera />,
            title: "Heritage Guided Tour",
            desc: "Private tour of historical monuments and local markets.",
            price: "₹2,500",
            action: null,
            color: "#8b5cf6"
          },
          {
            type: "dine",
            icon: <FaUtensils />,
            title: "Lunch at The Spice Route",
            desc: "Authentic regional thali experience.",
            price: "₹1,800",
            action: "/dine-in",
            color: "#f59e0b"
          }
        ]
      },
      {
        dayNumber: 3,
        title: "Departure",
        items: [
          {
            type: "activity",
            icon: <FaCamera />,
            title: "Morning Spa & Wellness",
            desc: "Relaxing 90-minute Ayurvedic massage.",
            price: "₹4,000",
            action: null,
            color: "#8b5cf6"
          },
          {
            type: "flight",
            icon: <FaPlane />,
            title: `Return Flight from ${destination}`,
            desc: "Premium Economy, Evening Departure.",
            price: "₹7,200",
            action: "/flights",
            color: "#3b82f6"
          }
        ]
      }
    ]
  };

  const handleBookItem = (actionPath) => {
    if (actionPath) {
      navigate(actionPath);
    } else {
      alert("This activity will be added to your holistic checkout package soon.");
    }
  };

  if (isAnalyzing) {
    return (
      <div className="container ai-loading-container animate-fade-in-up">
        <div className="ai-brain-wrapper pulse-glow-strong">
          <FaBrain className="ai-brain-icon" />
        </div>
        <h2 className="ai-loading-title">AI is Planning Your Trip</h2>
        <p className="ai-loading-query">"{query}"</p>
        
        <div className="ai-steps-container">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className={`ai-step ${idx === analysisStep ? 'active' : ''} ${idx < analysisStep ? 'completed' : ''}`}
            >
              <span className="step-icon">
                {idx < analysisStep ? <FaCheckCircle className="text-emerald" /> : idx === analysisStep ? <FaSpinner className="spin" /> : <span className="dot" />}
              </span>
              <span className="step-text">{step}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container ai-result-container animate-fade-in-up">
      <div className="ai-result-header glass">
        <div className="ai-header-content">
          <div className="ai-badge">✨ AI Generated Itinerary</div>
          <h1 className="ai-title">Your Trip to {itinerary.destination}</h1>
          <p className="ai-subtitle">Based on your request: <i>"{query}"</i></p>
        </div>
        <div className="ai-summary">
          <div className="summary-item">
            <span className="summary-label">Duration</span>
            <span className="summary-value">{itinerary.duration}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Estimated Cost</span>
            <span className="summary-value">{itinerary.totalEstimatedCost}</span>
          </div>
          <button className="btn-primary bulk-book-btn" onClick={() => handleBookItem('/checkout')}>
            Book Entire Trip <FaArrowRight style={{marginLeft: '8px'}}/>
          </button>
        </div>
      </div>

      <div className="itinerary-timeline">
        {itinerary.days.map((day, dIdx) => (
          <div key={dIdx} className="timeline-day animate-fade-in-up" style={{ animationDelay: `${dIdx * 150}ms` }}>
            <div className="day-marker">
              <span className="day-num">Day {day.dayNumber}</span>
            </div>
            <div className="day-content">
              <h3 className="day-title">{day.title}</h3>
              <div className="day-items-grid">
                {day.items.map((item, iIdx) => (
                  <div key={iIdx} className="itinerary-item-card glass hover-glow">
                    <div className="item-icon-col" style={{ color: item.color, backgroundColor: `${item.color}22`, borderColor: `${item.color}55` }}>
                      {item.icon}
                    </div>
                    <div className="item-details">
                      <h4 className="item-title">{item.title}</h4>
                      <p className="item-desc">{item.desc}</p>
                    </div>
                    <div className="item-action">
                      <span className="item-price">{item.price}</span>
                      <button 
                        className="item-book-btn"
                        style={{ border: `1px solid ${item.color}`, color: item.color }}
                        onClick={() => handleBookItem(item.action)}
                      >
                        {item.action ? 'Select' : 'Added'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiPlanner;
