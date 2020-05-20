import React from 'react';

const LoadingCard = () => {
  return (
    <>
      {[1, 2, 3, 4].map(i => (
        <div key={`view-menu-item#${i}`} className="view-menu-item">
          <div
            key={`view-menu-loading-element-heading#${i}`}
            className="view-menu-loading-element-heading gradient"></div>
          <div
            key={`view-menu-loading-element-body#${i}`}
            className="view-menu-loading-element-body gradient"></div>
        </div>
      ))}
    </>
  );
}

export default LoadingCard;
