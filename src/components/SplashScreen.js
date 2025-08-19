import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.css';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-screen">
      <div className="logo-container">
        <div className="logo">
          <div className="shield">
            <div className="bug-silhouette">🛡️🐛</div>
          </div>
        </div>
        <h1 className="app-title">PestControl</h1>
        <p className="tagline">Smart Pest Management in Your Pocket</p>
      </div>
      <div className="loading-animation">
        <div className="footprint-trail">
          <span className="footprint">🐾</span>
          <span className="footprint">🐾</span>
          <span className="footprint">🐾</span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;