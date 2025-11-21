import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ManagerSearchForm from '../components/ManagerSearchForm';
import ConsentRecordDisplay, { NoRecordFound } from '../components/ConsentRecordDisplay';
import { searchConsentByToken, verifyManagerToken, managerLogout } from '../services/apiClient';
import { ROUTES } from '../config/constants';
import './ManagerDashboardPage.css';

/**
 * ManagerDashboardPage Component
 * Dashboard for searching consent records
 */
const ManagerDashboardPage = () => {
  const [record, setRecord] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [searchedToken, setSearchedToken] = useState('');
  const [isVerifying, setIsVerifying] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Verify authentication on mount
    const verifyAuth = async () => {
      try {
        await verifyManagerToken();
        setIsVerifying(false);
      } catch (err) {
        console.error('Authentication verification failed:', err);
        navigate(ROUTES.MANAGER_LOGIN);
      }
    };

    verifyAuth();
  }, [navigate]);

  const handleSearch = async (token) => {
    setRecord(null);
    setNotFound(false);
    setSearchedToken(token);

    try {
      const response = await searchConsentByToken(token);
      
      if (response.success && response.data) {
        setRecord(response.data);
      }
    } catch (err) {
      if (err.status === 404) {
        setNotFound(true);
      } else {
        console.error('Search error:', err);
        alert(err.message || 'Failed to search. Please try again.');
      }
      throw err;
    }
  };

  const handleLogout = () => {
    managerLogout();
    navigate(ROUTES.MANAGER_LOGIN);
  };

  const handleCloseResult = () => {
    setRecord(null);
    setNotFound(false);
    setSearchedToken('');
  };

  if (isVerifying) {
    return (
      <div className="manager-dashboard-page">
        <div className="manager-dashboard-page__loading">
          <div className="manager-dashboard-page__spinner"></div>
          <p>Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="manager-dashboard-page">
      <div className="manager-dashboard-page__container">
        <div className="manager-dashboard-page__header">
          <h1 className="manager-dashboard-page__title">
            Manager Dashboard
          </h1>
          <p className="manager-dashboard-page__subtitle">
            Search and verify customer consent records
          </p>
        </div>

        <ManagerSearchForm
          onSearch={handleSearch}
          onLogout={handleLogout}
        />

        {record && (
          <ConsentRecordDisplay
            record={record}
            onClose={handleCloseResult}
          />
        )}

        {notFound && (
          <NoRecordFound
            token={searchedToken}
            onClose={handleCloseResult}
          />
        )}
      </div>
    </div>
  );
};

export default ManagerDashboardPage;
