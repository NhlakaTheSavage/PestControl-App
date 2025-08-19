import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeScreen.css';

const HomeScreen = () => {
  const navigate = useNavigate();

  const mainFeatures = [
    {
      title: "AI Pest ID",
      subtitle: "Snap & Identify",
      icon: "📷",
      route: "/identify",
      color: "#4CAF50"
    },
    {
      title: "Book Service",
      subtitle: "Find a Professional",
      icon: "🔧",
      route: "/booking",
      color: "#2196F3"
    },
    {
      title: "Tracker",
      subtitle: "Log a Sighting",
      icon: "📍",
      route: "/tracker",
      color: "#FF9800"
    },
    {
      title: "Tips & Prevention",
      subtitle: "Learn & Protect",
      icon: "🍃",
      route: "/tips",
      color: "#9C27B0"
    }
  ];

  return (
    <div className="home-screen">
      <div className="top-bar">
        <div className="location">
          <span className="location-icon">📍</span>
          <span>Current Location</span>
        </div>
        <div className="notification-icon">🔔</div>
      </div>

      <div className="quick-alert-banner">
        <div className="alert-content">
          <span className="alert-icon">⚠️</span>
          <span>Mosquito season starts this week!</span>
        </div>
      </div>

      <div className="main-features-grid">
        {mainFeatures.map((feature, index) => (
          <div 
            key={index}
            className="feature-card"
            style={{ borderLeftColor: feature.color }}
            onClick={() => navigate(feature.route)}
          >
            <div className="feature-icon" style={{ color: feature.color }}>
              {feature.icon}
            </div>
            <div className="feature-content">
              <h3>{feature.title}</h3>
              <p>{feature.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bottom-navigation">
        <div className="nav-item active">
          <span>🏠</span>
          <span>Home</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/tracker')}>
          <span>🗺️</span>
          <span>Tracker</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/tips')}>
          <span>💡</span>
          <span>Tips</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/settings')}>
          <span>⚙️</span>
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;