import React from 'react';
import './Marquee.css';

interface MarqueeProps {
  items?: string[];
  speed?: number;
}

const defaultItems = [
  '🧙‍♂️ Un mundo para cada lector',
  '📚 Explora tus mundos favoritos',
  '🐉 Colección completa de Mangas',
];

const Marquee: React.FC<MarqueeProps> = ({ items = defaultItems, speed = 25 }) => {
  // Repetimos la lista para cubrir pantallas anchas sin huecos
  const fullList = [...items, ...items, ...items, ...items];

  return (
    <div className="marquee-container">
      <div 
        className="marquee-track" 
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="marquee-content">
          {fullList.map((item, index) => (
            <span key={`a-${index}`} className="marquee-item">
              {item}
            </span>
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {fullList.map((item, index) => (
            <span key={`b-${index}`} className="marquee-item">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;