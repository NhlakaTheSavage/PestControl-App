import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingsScreen.css';

const SettingsScreen = () => {
  const [settings, setSettings] = useState({
    notifications: {
      pestAlerts: true,
      serviceReminders: true,
      seasonalTips: false,
      promotions: true
    },
    language: 'en',
    region: 'US',
    subscription: 'free'
  });
  
  const navigate = useNavigate();

  const handleNotificationToggle = (type) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [type]: !settings.notifications[type]
      }
    });
  };

  const handleLanguageChange = (language) => {
    setSettings({ ...settings, language });
  };

  const handleRegionChange = (region) => {
    setSettings({ ...settings, region });
  };

  return (
    <div className="settings-screen">
      <div className="header">
        <button className="back-btn" onClick={() => navigate('/home')}>←</button>
        <h2>Settings</h2>
      </div>

      <div className="settings-sections">
        <div className="settings-section">
          <h3>👤 Profile & Account</h3>
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Edit Profile</span>
              <span className="setting-description">Update your personal information</span>
            </div>
            <button className="setting-action">→</button>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Account Security</span>
              <span className="setting-description">Password and security settings</span>
            </div>
            <button className="setting-action">→</button>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Privacy Settings</span>
              <span className="setting-description">Control your data and privacy</span>
            </div>
            <button className="setting-action">→</button>
          </div>
        </div>

        <div className="settings-section">
          <h3>🔔 Notifications</h3>
          
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Pest Alerts</span>
              <span className="setting-description">Seasonal pest warnings</span>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={settings.notifications.pestAlerts}
                onChange={() => handleNotificationToggle('pestAlerts')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Service Reminders</span>
              <span className="setting-description">Treatment and inspection reminders</span>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={settings.notifications.serviceReminders}
                onChange={() => handleNotificationToggle('serviceReminders')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Seasonal Tips</span>
              <span className="setting-description">Prevention tips and advice</span>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={settings.notifications.seasonalTips}
                onChange={() => handleNotificationToggle('seasonalTips')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Promotions</span>
              <span className="setting-description">Special offers and discounts</span>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={settings.notifications.promotions}
                onChange={() => handleNotificationToggle('promotions')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h3>🌍 Language & Region</h3>
          
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Language</span>
              <span className="setting-description">App display language</span>
            </div>
            <select 
              value={settings.language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="setting-select"
            >
              <option value="en">English</option>
              <option value="zu">Isizulu</option>
              <option value="st">Sesotho</option>
              <option value="ts">Xetsonga</option>
            </select>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Region</span>
              <span className="setting-description">Your location for local services</span>
            </div>
            <select 
              value={settings.region}
              onChange={(e) => handleRegionChange(e.target.value)}
              className="setting-select"
            >
              <option value="GP">Gauteng</option>
              <option value="NL">KwaZulu Natal</option>
              <option value="MP">Limpopo</option>
              <option value="NW">North West</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <h3>💎 Subscription</h3>
          
          <div className="subscription-card">
            <div className="current-plan">
              <h4>Current Plan: {settings.subscription === 'free' ? 'Free' : 'Premium'}</h4>
              {settings.subscription === 'free' ? (
                <p>Upgrade to Premium for unlimited pest identification and priority support</p>
              ) : (
                <p>You have access to all premium features</p>
              )}
            </div>
            
            {settings.subscription === 'free' && (
              <button className="upgrade-btn">
                Upgrade to Premium - R109.99/month
              </button>
            )}
            
            <div className="subscription-features">
              <div className="feature-item">
                <span className={settings.subscription === 'premium' ? 'included' : 'limited'}>✓</span>
                <span>Unlimited AI Pest Identification</span>
              </div>
              <div className="feature-item">
                <span className={settings.subscription === 'premium' ? 'included' : 'not-included'}>✓</span>
                <span>Priority Customer Support</span>
              </div>
              <div className="feature-item">
                <span className={settings.subscription === 'premium' ? 'included' : 'not-included'}>✓</span>
                <span>Advanced Tracking & Analytics</span>
              </div>
              <div className="feature-item">
                <span className={settings.subscription === 'premium' ? 'included' : 'not-included'}>✓</span>
                <span>Exclusive Prevention Content</span>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>ℹ️ About</h3>
          
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Help & Support</span>
              <span className="setting-description">Get help and contact support</span>
            </div>
            <button className="setting-action">→</button>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Terms of Service</span>
              <span className="setting-description">Read our terms and conditions</span>
            </div>
            <button className="setting-action">→</button>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Privacy Policy</span>
              <span className="setting-description">How we handle your data</span>
            </div>
            <button className="setting-action">→</button>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">App Version</span>
              <span className="setting-description">v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;