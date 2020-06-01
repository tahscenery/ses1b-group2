import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';

import './Home.css';

const Home = () => {
  useEffect(() => {
    document.title = 'Home – Sapori Unici';
  }, []);

  return (
    <div className="component-container">
      <Typography variant="h2">Welcome to Sapori Unici</Typography>
      <img
        className="restauarnt-image"
        src={`https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80`}
        alt="restaurant-image"
        />
    </div>
  );
}

export default Home;
