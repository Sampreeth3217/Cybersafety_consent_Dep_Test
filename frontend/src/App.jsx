import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLandingPage from './pages/MainLandingPage';
import CybersafetyConsentPage from './pages/CybersafetyConsentPage';
import ConsentFlowPage from './pages/ConsentFlowPage';
import ConfirmationPage from './pages/ConfirmationPage';
import ManagerDashboardPage from './pages/ManagerDashboardPage';
import CybercrimeDetailPage from './pages/CybercrimeDetailPage';
import CybercrimeCategoryPage from './pages/CybercrimeCategoryPage';
import BankerLoginPage from './pages/BankerLoginPage';
import BankerDashboardPage from './pages/BankerDashboardPage';
import AddMuleAccountPage from './pages/AddMuleAccountPage';
import ViewMuleAccountsPage from './pages/ViewMuleAccountsPage';
import PoliceLoginPage from './pages/PoliceLoginPage';
import PoliceDashboardPage from './pages/PoliceDashboardPage';
import PoliceMuleAccountsPage from './pages/PoliceMuleAccountsPage';
import PoliceAllRecordsPage from './pages/PoliceAllRecordsPage';
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
          
          {/* Manager Routes (login removed) */}
          <Route path={ROUTES.MANAGER_LOGIN} element={<ManagerDashboardPage />} />
          <Route path={ROUTES.MANAGER_DASHBOARD} element={<ManagerDashboardPage />} />
          
          {/* Banker Routes */}
          <Route path="/cybersuraksha/banker" element={<BankerLoginPage />} />
          <Route path="/cybersuraksha/banker/dashboard" element={<BankerDashboardPage />} />
          <Route path="/cybersuraksha/banker/add-mule-account" element={<AddMuleAccountPage />} />
          <Route path="/cybersuraksha/banker/view-mule-accounts" element={<ViewMuleAccountsPage />} />
          
          {/* Police Routes */}
          <Route path="/cybersuraksha/police" element={<PoliceLoginPage />} />
          <Route path="/cybersuraksha/police/dashboard" element={<PoliceDashboardPage />} />
          <Route path="/cybersuraksha/police/all-records" element={<PoliceAllRecordsPage />} />
          <Route path="/cybersuraksha/police/mule-accounts" element={<PoliceMuleAccountsPage />} />
          
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