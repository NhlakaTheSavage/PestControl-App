import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingScreen.css';

const OnboardingScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Identify Pests Instantly",
      description: "Use AI-powered camera to identify any pest in seconds",
      icon: "📸🐛",
      image: "camera-scanning"
    },
    {
      title: "Book Experts Quickly",
      description: "Connect with certified pest control professionals near you",
      icon: "👨‍🔧",
      image: "service-worker"
    },
    {
      title: "Track & Prevent Infestations",
      description: "Monitor pest activity and get prevention recommendations",
      icon: "🗺️📍",
      image: "heatmap"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleGetStarted = () => {
    navigate('/home');
  };

  return (
    <div className="onboarding-screen">
      <div className="slide-container">
        <div className="slide">
          <div className="slide-icon">{slides[currentSlide].icon}</div>
          <h2>{slides[currentSlide].title}</h2>
          <p>{slides[currentSlide].description}</p>
        </div>
      </div>
      
      <div className="slide-indicators">
        {slides.map((_, index) => (
          <span 
            key={index} 
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
      
      <div className="navigation-buttons">
        {currentSlide > 0 && (
          <button className="btn-secondary" onClick={prevSlide}>Previous</button>
        )}
        
        {currentSlide < slides.length - 1 ? (
          <button className="btn-primary" onClick={nextSlide}>Next</button>
        ) : (
          <button className="btn-primary get-started" onClick={handleGetStarted}>
            Get Started
          </button>
        )}
      </div>
    </div>
  );
};

export default OnboardingScreen;