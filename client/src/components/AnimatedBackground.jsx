import React from 'react';
import { FaPlane } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const AnimatedBackground = () => {
  const location = useLocation();
  const path = location.pathname;

  let bgClass = "animated-bg-container";
  let content = null;

  if (path === '/flights' || path === '/pnr' || path === '/checkout') {
    bgClass += " bg-flights";
    content = (
      <>
        <div className="bg-gradient-overlay"></div>
        <FaPlane className="flying-plane plane-1" />
        <FaPlane className="flying-plane plane-2" />
        <FaPlane className="flying-plane plane-3" />
      </>
    );
  } else if (path === '/hotels') {
    bgClass += " bg-hotels";
    content = (
      <>
        <div className="bg-gradient-overlay" style={{ backgroundImage: 'radial-gradient(circle at 15% 0%, rgba(16, 185, 129, 0.12) 0%, transparent 50%), radial-gradient(circle at 85% 100%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)' }}></div>
      </>
    );
  } else if (path === '/trains') {
    bgClass += " bg-trains";
    content = (
      <>
        <div className="bg-gradient-overlay" style={{ backgroundImage: 'radial-gradient(circle at 15% 0%, rgba(139, 92, 246, 0.12) 0%, transparent 50%), radial-gradient(circle at 85% 100%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)' }}></div>
      </>
    );
  } else if (path === '/buses') {
    bgClass += " bg-buses";
    content = (
      <>
        <div className="bg-gradient-overlay" style={{ backgroundImage: 'radial-gradient(circle at 15% 0%, rgba(239, 68, 68, 0.12) 0%, transparent 50%), radial-gradient(circle at 85% 100%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)' }}></div>
      </>
    );
  } else if (path === '/dine-in') {
    bgClass += " bg-dine-in";
    content = (
      <>
        <div className="bg-gradient-overlay" style={{ backgroundImage: 'radial-gradient(circle at 15% 0%, rgba(245, 158, 11, 0.12) 0%, transparent 50%), radial-gradient(circle at 85% 100%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)' }}></div>
      </>
    );
  } else {
    bgClass += " bg-portal";
    content = (
      <div className="bg-gradient-overlay"></div>
    );
  }

  return (
    <div className={bgClass}>
       {content}
    </div>
  );
};

export default AnimatedBackground;
