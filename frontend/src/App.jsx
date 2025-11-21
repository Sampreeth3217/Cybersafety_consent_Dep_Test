import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ConsentFlowPage from './pages/ConsentFlowPage';
import ConfirmationPage from './pages/ConfirmationPage';
import ManagerLoginPage from './pages/ManagerLoginPage';
import ManagerDashboardPage from './pages/ManagerDashboardPage';
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
          {/* Public Routes */}
          <Route path={ROUTES.HOME} element={<LandingPage />} />
          <Route path={ROUTES.CONSENT_FLOW} element={<ConsentFlowPage />} />
          <Route path={ROUTES.CONFIRMATION} element={<ConfirmationPage />} />
          
          {/* Manager Routes (hidden) */}
          <Route path={ROUTES.MANAGER_LOGIN} element={<ManagerLoginPage />} />
          <Route path={ROUTES.MANAGER_DASHBOARD} element={<ManagerDashboardPage />} />
          
          {/* 404 Redirect */}
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
