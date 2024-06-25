import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h1>Welcome to the Fugitive Hunt!</h1>
      <button onClick={() => navigate('/city-selection')}>Start</button>
    </div>
  );
};

export default LandingPage;
