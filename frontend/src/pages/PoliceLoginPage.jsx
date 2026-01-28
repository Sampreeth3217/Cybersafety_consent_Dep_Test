import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PoliceLoginPage.css';

const PoliceLoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/police/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        // Store token and username
        localStorage.setItem('policeToken', data.data.token);
        localStorage.setItem('policeUsername', data.data.username);
        
        // Navigate to police dashboard
        navigate('/cybersuraksha/police/dashboard');
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="police-login-container">
      <div className="police-login-card">
        <div className="police-login-header">
          <div className="police-badge">
            <span className="badge-icon">🛡️</span>
          </div>
          <h1>Police Dashboard Login</h1>
          <p>NTR Police Commissionerate - Analytics & Monitoring System</p>
        </div>

        <form onSubmit={handleSubmit} className="police-login-form">
          <div className="form-group">
            <label htmlFor="username">User ID</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your User ID"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="form-input"
            />
          </div>

          {error && (
            <div className="error-message">
              <i className="error-icon">⚠️</i>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Access Dashboard'}
          </button>
        </form>

        <div className="police-login-footer">
          <p className="help-text">
            Authorized Personnel Only. All access is logged and monitored.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PoliceLoginPage;
