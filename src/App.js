import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import all screen components
import SplashScreen from './components/SplashScreen';
import OnboardingScreen from './components/OnboardingScreen';
import HomeScreen from './components/HomeScreen';
import PestIdentificationScreen from './components/PestIdentificationScreen';
import ServiceBookingScreen from './components/ServiceBookingScreen';
import TrackerScreen from './components/TrackerScreen';
import TipsScreen from './components/TipsScreen';
import SettingsScreen from './components/SettingsScreen';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/onboarding" element={<OnboardingScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/identify" element={<PestIdentificationScreen />} />
          <Route path="/booking" element={<ServiceBookingScreen />} />
          <Route path="/tracker" element={<TrackerScreen />} />
          <Route path="/tips" element={<TipsScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;