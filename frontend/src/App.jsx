import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLandingPage from './pages/MainLandingPage';
import CybersafetyConsentPage from './pages/CybersafetyConsentPage';
import ConsentFlowPage from './pages/ConsentFlowPage';
import ConfirmationPage from './pages/ConfirmationPage';
import ManagerLoginPage from './pages/ManagerLoginPage';
import ManagerDashboardPage from './pages/ManagerDashboardPage';
import CybercrimeDetailPage from './pages/CybercrimeDetailPage';
import CybercrimeCategoryPage from './pages/CybercrimeCategoryPage';
import { ROUTES } from './config/constants';
import './App.css';

/**
 * Main App Component
 * Handles routing for the entire application
 */
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          {/* Main Landing Page */}
          <Route path={ROUTES.HOME} element={<MainLandingPage />} />
          
          {/* CyberSuraksha App Routes */}
          <Route path={ROUTES.CYBERSAFETY_CONSENT} element={<CybersafetyConsentPage />} />
          <Route path={ROUTES.CONSENT_FLOW} element={<ConsentFlowPage />} />
          <Route path={ROUTES.CONFIRMATION} element={<ConfirmationPage />} />
          
          {/* Manager Routes (hidden) */}
          <Route path={ROUTES.MANAGER_LOGIN} element={<ManagerLoginPage />} />
          <Route path={ROUTES.MANAGER_DASHBOARD} element={<ManagerDashboardPage />} />
          
          {/* Cybercrime Categories Page (old) */}
          <Route path="/cybercrime-categories" element={<CybercrimeDetailPage />} />
          
          {/* Individual Cybercrime Category Pages */}
          <Route path="/cybercrime/:category" element={<CybercrimeCategoryPage />} />
          
          {/* 404 Redirect */}
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
//NSC