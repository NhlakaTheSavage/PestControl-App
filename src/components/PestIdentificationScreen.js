import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PestIdentificationScreen.css';

const PestIdentificationScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [identificationResult, setIdentificationResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleImageCapture = () => {
    // Simulate camera capture
    setIsAnalyzing(true);
    setTimeout(() => {
      setIdentificationResult({
        pestName: "Common House Ant",
        confidence: 94,
        treatments: {
          diy: ["Ant bait stations", "Cinnamon barrier", "Vinegar spray"],
          professional: ["Targeted gel treatment", "Perimeter spray", "Colony elimination"]
        }
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleGalleryUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      handleImageCapture();
    }
  };

  return (
    <div className="pest-identification-screen">
      <div className="header">
        <button className="back-btn" onClick={() => navigate('/home')}>←</button>
        <h2>AI Pest Identification</h2>
      </div>

      {!identificationResult ? (
        <div className="camera-section">
          <div className="camera-view">
            {selectedImage ? (
              <img src={selectedImage} alt="Selected" className="preview-image" />
            ) : (
              <div className="camera-placeholder">
                <span className="camera-icon">📷</span>
                <p>Point camera at pest</p>
              </div>
            )}
          </div>

          {isAnalyzing && (
            <div className="analyzing-overlay">
              <div className="spinner"></div>
              <p>Analyzing pest...</p>
            </div>
          )}

          <div className="capture-buttons">
            <button className="capture-btn" onClick={handleImageCapture}>
              <span>📸</span>
              Take Photo
            </button>
            <label className="upload-btn">
              <span>🖼️</span>
              Upload from Gallery
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleGalleryUpload}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>
      ) : (
        <div className="results-section">
          <div className="result-header">
            <h3>{identificationResult.pestName}</h3>
            <div className="confidence">
              <span className="confidence-label">Confidence:</span>
              <span className="confidence-value">{identificationResult.confidence}%</span>
            </div>
          </div>

          <div className="treatments-section">
            <h4>Suggested Treatments</h4>
            
            <div className="treatment-category">
              <h5>🏠 DIY Solutions</h5>
              <ul>
                {identificationResult.treatments.diy.map((treatment, index) => (
                  <li key={index}>{treatment}</li>
                ))}
              </ul>
            </div>

            <div className="treatment-category">
              <h5>👨‍🔧 Professional Solutions</h5>
              <ul>
                {identificationResult.treatments.professional.map((treatment, index) => (
                  <li key={index}>{treatment}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="action-buttons">
            <button 
              className="book-pro-btn"
              onClick={() => navigate('/booking')}
            >
              Book a Professional
            </button>
            <button 
              className="try-again-btn"
              onClick={() => {
                setIdentificationResult(null);
                setSelectedImage(null);
              }}
            >
              Try Another Photo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PestIdentificationScreen;