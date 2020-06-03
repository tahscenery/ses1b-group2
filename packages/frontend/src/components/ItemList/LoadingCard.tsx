import React from 'react';

import './LoadingCard.css';

interface LoadingCardProps {
  numberOfItems: number;
}

const LoadingCard = ({ numberOfItems }: LoadingCardProps) => {
  return (
    <>
      {[...Array(numberOfItems).keys()].map(i => (
        <div key={`loading-card-item#${i}`} className="loading-card-item">
          <div
            key={`loading-card-heading#${i}`}
            className="loading-card-item-heading gradient"></div>
          <div
            key={`loading-card-body#${i}`}
            className="loading-card-item-body gradient"></div>
        </div>
      ))}
    </>
  );
}

export default LoadingCard;
