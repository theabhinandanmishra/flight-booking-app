import React from 'react';
import { FaUtensils, FaStar, FaMapMarkerAlt } from 'react-icons/fa';

const DineInCard = ({ restaurant, isFeatured, index }) => {
  return (
    <div 
      className={`flight-card glass animate-fade-in-up delay-${(index % 5 + 1) * 100}`}
      style={{ flexDirection: 'row', alignItems: 'stretch', padding: '1rem', gap: '1.5rem' }}
    >
      {isFeatured && (
        <div className="cheapest-badge" style={{ background: '#f59e0b', boxShadow: '0 0 10px rgba(245, 158, 11, 0.3)' }}>
          ★ Featured
        </div>
      )}
      
      <div 
        style={{ 
          width: '200px', 
          minHeight: '150px', 
          borderRadius: '12px', 
          backgroundImage: `url(${restaurant.image})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }} 
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0.5rem 0' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{restaurant.name}</h3>
            <div style={{ display: 'flex', color: '#f59e0b', fontSize: '0.9rem', alignItems: 'center', gap: '0.25rem' }}>
               <FaStar /> {restaurant.rating}
            </div>
          </div>
          
          <div style={{ color: 'var(--accent)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500 }}>
            {restaurant.cuisine} • {restaurant.costForTwo} for two
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            <FaMapMarkerAlt />
            <span>{restaurant.location}</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
           {restaurant.tags.map((tag, i) => (
             <span key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', color: '#a1a1aa' }}>
               {tag}
             </span>
           ))}
        </div>
      </div>

      <div className="price-section" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', minWidth: '150px', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '1.5rem' }}>
        <button className="btn-primary" style={{ width: '100%', padding: '0.75rem', background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)' }}>
          Reserve Table
        </button>
      </div>
    </div>
  );
};

export default DineInCard;
