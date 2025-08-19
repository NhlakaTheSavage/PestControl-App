import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrackerScreen.css';

const TrackerScreen = () => {
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'heatmap'
  const [showAddSighting, setShowAddSighting] = useState(false);
  const navigate = useNavigate();

  const sightings = [
    {
      id: 1,
      pest: "Ant",
      icon: "🐜",
      location: "Kitchen",
      date: "2024-01-15",
      severity: "medium",
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: 2,
      pest: "Cockroach",
      icon: "🪳",
      location: "Bathroom",
      date: "2024-01-12",
      severity: "high",
      coordinates: { lat: 40.7130, lng: -74.0058 }
    },
    {
      id: 3,
      pest: "Spider",
      icon: "🕷️",
      location: "Basement",
      date: "2024-01-10",
      severity: "low",
      coordinates: { lat: 40.7126, lng: -74.0062 }
    }
  ];

  const reminders = [
    {
      id: 1,
      message: "Time for follow-up ant treatment",
      date: "2024-01-20",
      type: "treatment"
    },
    {
      id: 2,
      message: "Monthly inspection due",
      date: "2024-01-25",
      type: "inspection"
    }
  ];

  const handleAddSighting = (e) => {
    e.preventDefault();
    alert('Sighting logged successfully!');
    setShowAddSighting(false);
  };

  return (
    <div className="tracker-screen">
      <div className="header">
        <button className="back-btn" onClick={() => navigate('/home')}>←</button>
        <h2>Pest Tracker</h2>
        <button 
          className="add-btn"
          onClick={() => setShowAddSighting(true)}
        >
          +
        </button>
      </div>

      <div className="view-toggle">
        <button 
          className={`toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
          onClick={() => setViewMode('map')}
        >
          📍 Map View
        </button>
        <button 
          className={`toggle-btn ${viewMode === 'heatmap' ? 'active' : ''}`}
          onClick={() => setViewMode('heatmap')}
        >
          🔥 Heatmap
        </button>
      </div>

      <div className="map-container">
        {viewMode === 'map' ? (
          <div className="map-view">
            <div className="map-placeholder">
              <p>🗺️ Interactive Map</p>
              <div className="sighting-pins">
                {sightings.map(sighting => (
                  <div 
                    key={sighting.id} 
                    className={`map-pin ${sighting.severity}`}
                    title={`${sighting.pest} - ${sighting.location}`}
                  >
                    {sighting.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="heatmap-view">
            <div className="heatmap-placeholder">
              <p>🔥 Pest Density Heatmap</p>
              <div className="heatmap-legend">
                <span className="legend-item low">Low</span>
                <span className="legend-item medium">Medium</span>
                <span className="legend-item high">High</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="sightings-list">
        <h3>Recent Sightings</h3>
        {sightings.map(sighting => (
          <div key={sighting.id} className="sighting-item">
            <div className="sighting-icon">{sighting.icon}</div>
            <div className="sighting-details">
              <h4>{sighting.pest}</h4>
              <p>{sighting.location} • {sighting.date}</p>
            </div>
            <div className={`severity-badge ${sighting.severity}`}>
              {sighting.severity}
            </div>
          </div>
        ))}
      </div>

      <div className="reminders-section">
        <h3>Reminders</h3>
        {reminders.map(reminder => (
          <div key={reminder.id} className="reminder-item">
            <div className="reminder-icon">
              {reminder.type === 'treatment' ? '💊' : '🔍'}
            </div>
            <div className="reminder-content">
              <p>{reminder.message}</p>
              <span className="reminder-date">{reminder.date}</span>
            </div>
          </div>
        ))}
      </div>

      {showAddSighting && (
        <div className="modal-overlay">
          <div className="add-sighting-modal">
            <div className="modal-header">
              <h3>Add New Sighting</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddSighting(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleAddSighting} className="sighting-form">
              <div className="form-group">
                <label>Pest Type:</label>
                <select required>
                  <option value="">Select Pest</option>
                  <option value="ant">Ant</option>
                  <option value="cockroach">Cockroach</option>
                  <option value="spider">Spider</option>
                  <option value="termite">Termite</option>
                  <option value="rodent">Rodent</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Location:</label>
                <input type="text" placeholder="e.g., Kitchen, Bathroom" required />
              </div>
              
              <div className="form-group">
                <label>Severity:</label>
                <select required>
                  <option value="">Select Severity</option>
                  <option value="low">Low - Single pest</option>
                  <option value="medium">Medium - Few pests</option>
                  <option value="high">High - Many pests</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Photo:</label>
                <input type="file" accept="image/*" />
              </div>
              
              <div className="form-group">
                <label>Notes:</label>
                <textarea placeholder="Additional details about the sighting"></textarea>
              </div>
              
              <div className="form-buttons">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowAddSighting(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Log Sighting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackerScreen;