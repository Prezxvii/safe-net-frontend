import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout and components
import AppLayout from './components/AppLayout';
import PageTransitionWrapper from './components/PageTransitionWrapper';

// Page imports
import HomePage from './pages/HomePage';
import FAQPage from './pages/FAQPage';
import HowItWorksPage from './pages/HowItWorksPage';

// NEW PAGE IMPORTS
import SafetyModelPage from './pages/SafetyModelPage'; 
import ResourcesPage from './pages/ResourcesPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import PlaceholderPage from './components/PlaceholderPage';

function App() {
  return (
    <AppLayout>
      <PageTransitionWrapper>
        <Routes>
          {/* Main Content Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          
          {/* NEW PAGES */}
          <Route path="/safety-model" element={<SafetyModelPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Legal/Placeholder Pages */}
          <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" message="Our full privacy and data usage guidelines." />} />
          <Route path="/terms" element={<PlaceholderPage title="Terms of Service" message="The legal terms governing the use of this service." />} />

          {/* Fallback for unknown routes */}
          <Route path="*" element={<PlaceholderPage title="404" message="Page Not Found" />} />
        </Routes>
      </PageTransitionWrapper>
    </AppLayout>
  );
}

export default App;
