import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BankerLoginPage.css';

const BankerLoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ifscCode: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.toUpperCase()
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/banker/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        // Store token and IFSC code
        localStorage.setItem('bankerToken', data.data.token);
        localStorage.setItem('bankerIfscCode', data.data.ifscCode);
        
        // Navigate to banker dashboard
        navigate('/cybersuraksha/banker/dashboard');
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
    <div className="banker-login-container">
      <div className="banker-login-card">
        <div className="banker-login-header">
          <h1>Banker Login</h1>
          <p>NTR Police Commissionerate - Mule Account Reporting System</p>
        </div>

        <form onSubmit={handleSubmit} className="banker-login-form">
          <div className="form-group">
            <label htmlFor="ifscCode">IFSC Code</label>
            <input
              type="text"
              id="ifscCode"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              placeholder="Enter your bank's IFSC code"
              required
              maxLength={11}
              className="form-input"
            />
            <small className="form-help">Example: SBIN0001234</small>
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
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="banker-login-footer">
          <p className="help-text">
            For credentials or technical support, contact the administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BankerLoginPage;
