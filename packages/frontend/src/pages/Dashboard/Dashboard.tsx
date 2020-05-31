import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const Dashboard = () => {
  const location = useLocation<{ didCreateOrder: boolean }>();

  return (
    <div className="component-container">
      <Typography variant="h2">Dashboard</Typography>
      {location.state.didCreateOrder ? (
        <p>All good</p>
      ) : (
        <p>Nothing here...</p>
      )}
    </div>
  )
}

export default Dashboard;
