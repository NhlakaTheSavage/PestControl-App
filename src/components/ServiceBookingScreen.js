import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ServiceBookingScreen.css';

const ServiceBookingScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    serviceType: 'all',
    priceRange: 'all',
    ecoFriendly: false
  });
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      name: "EcoPest Solutions",
      logo: "🌿",
      rating: 4.8,
      distance: "2.3 km",
      price: "R1289",
      ecoFriendly: true,
      services: ["Ant Control", "Termite Treatment", "Rodent Control"]
    },
    {
      id: 2,
      name: "QuickPest Pro",
      logo: "⚡",
      rating: 4.6,
      distance: "1.8 km",
      price: "R1175",
      ecoFriendly: false,
      services: ["General Pest Control", "Emergency Service"]
    },
    {
      id: 3,
      name: "GreenGuard Pest",
      logo: "🛡️",
      rating: 4.9,
      distance: "3.1 km",
      price: "R1095",
      ecoFriendly: true,
      services: ["Organic Treatment", "Pet-Safe Solutions"]
    }
  ];

  const handleBookService = (service) => {
    setSelectedService(service);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert('Booking confirmed! You will receive a confirmation email shortly.');
    navigate('/home');
  };

  return (
    <div className="service-booking-screen">
      <div className="header">
        <button className="back-btn" onClick={() => navigate('/home')}>←</button>
        <h2>Book Service</h2>
      </div>

      {!showBookingForm ? (
        <>
          <div className="search-section">
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Find pest control near me"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="filters-section">
            <div className="filter-group">
              <label>Service Type:</label>
              <select 
                value={selectedFilters.serviceType}
                onChange={(e) => setSelectedFilters({...selectedFilters, serviceType: e.target.value})}
              >
                <option value="all">All Services</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Price Range:</label>
              <select 
                value={selectedFilters.priceRange}
                onChange={(e) => setSelectedFilters({...selectedFilters, priceRange: e.target.value})}
              >
                <option value="all">Any Price</option>
                <option value="budget">Under $75</option>
                <option value="mid">$75 - $100</option>
                <option value="premium">$100+</option>
              </select>
            </div>
            
            <div className="filter-checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.ecoFriendly}
                  onChange={(e) => setSelectedFilters({...selectedFilters, ecoFriendly: e.target.checked})}
                />
                Eco-Friendly Only
              </label>
            </div>
          </div>

          <div className="services-list">
            {services
              .filter(service => !selectedFilters.ecoFriendly || service.ecoFriendly)
              .map(service => (
              <div key={service.id} className="service-card">
                <div className="service-header">
                  <div className="service-logo">{service.logo}</div>
                  <div className="service-info">
                    <h3>{service.name}</h3>
                    <div className="service-meta">
                      <span className="rating">⭐ {service.rating}</span>
                      <span className="distance">📍 {service.distance}</span>
                      <span className="price">{service.price}</span>
                    </div>
                  </div>
                </div>
                
                <div className="service-tags">
                  {service.services.map((tag, index) => (
                    <span key={index} className="service-tag">{tag}</span>
                  ))}
                  {service.ecoFriendly && <span className="eco-tag">🌿 Eco-Friendly</span>}
                </div>
                
                <button 
                  className="book-now-btn"
                  onClick={() => handleBookService(service)}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="booking-form-section">
          <h3>Book {selectedService.name}</h3>
          
          <form onSubmit={handleBookingSubmit} className="booking-form">
            <div className="form-group">
              <label>Service Date:</label>
              <input type="date" required />
            </div>
            
            <div className="form-group">
              <label>Preferred Time:</label>
              <select required>
                <option value="">Select Time</option>
                <option value="morning">Morning (8AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 5PM)</option>
                <option value="evening">Evening (5PM - 8PM)</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Address:</label>
              <textarea placeholder="Enter your full address" required></textarea>
            </div>
            
            <div className="form-group">
              <label>Special Instructions:</label>
              <textarea placeholder="Any specific requirements or pest details"></textarea>
            </div>
            
            <div className="form-group">
              <label>Payment Method:</label>
              <select required>
                <option value="">Select Payment</option>
                <option value="card">Credit/Debit Card</option>
                <option value="cash"></option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>
            
            <div className="booking-summary">
              <div className="summary-item">
                <span>Service:</span>
                <span>{selectedService.name}</span>
              </div>
              <div className="summary-item">
                <span>Price:</span>
                <span>{selectedService.price}</span>
              </div>
            </div>
            
            <div className="form-buttons">
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => setShowBookingForm(false)}
              >
                Cancel
              </button>
              <button type="submit" className="confirm-btn">
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ServiceBookingScreen;