import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ManagerLoginForm from '../components/ManagerLoginForm';
import { managerLogin } from '../services/apiClient';
import { ROUTES } from '../config/constants';
import './ManagerLoginPage.css';

/**
 * ManagerLoginPage Component
 * Hidden login page for managers
 */
const ManagerLoginPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    setError('');
    
    try {
      const response = await managerLogin(credentials);
      
      if (response.success) {
        navigate(ROUTES.MANAGER_DASHBOARD);
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
      throw err;
    }
  };

  return (
    <div className="manager-login-page">
      <ManagerLoginForm onLogin={handleLogin} error={error} />
    </div>
  );
};

export default ManagerLoginPage;
