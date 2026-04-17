import React from 'react';
import { FaPlane } from 'react-icons/fa';

const AnimatedBackground = () => {
  return (
    <div className="animated-bg-container">
       <div className="bg-gradient-overlay"></div>
       
       <FaPlane className="flying-plane plane-1" />
       <FaPlane className="flying-plane plane-2" />
       <FaPlane className="flying-plane plane-3" />
    </div>
  );
};

export default AnimatedBackground;
