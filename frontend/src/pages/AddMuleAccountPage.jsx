import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddMuleAccountPage.css';

const AddMuleAccountPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accountNumber: '',
    accountOpeningDate: '',
    accountHolderName: '',
    remarks: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [bankerIfsc, setBankerIfsc] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('bankerToken');
    const ifscCode = localStorage.getItem('bankerIfscCode');

    if (!token || !ifscCode) {
      navigate('/cybersuraksha/banker');
      return;
    }

    setBankerIfsc(ifscCode);
  }, [navigate]);

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

    const token = localStorage.getItem('bankerToken');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/mule-account/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        // Navigate to view page after successful submission
        navigate('/cybersuraksha/banker/view-mule-accounts');
      } else {
        setError(data.message || 'Failed to add mule account information.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/cybersuraksha/banker/dashboard');
  };

  return (
    <div className="add-mule-account-container">
      <div className="add-mule-header">
        <button onClick={handleCancel} className="back-button">
          ← Back to Dashboard
        </button>
        <div className="header-info">
          <h1>Add Mule Account Information</h1>
          <p className="bank-ifsc">IFSC: {bankerIfsc}</p>
        </div>
      </div>

      <div className="add-mule-content">
        <div className="form-card">
          <div className="form-header">
            <h2>Report Suspicious Account</h2>
            <p>Fill in all the details about the suspected mule account</p>
          </div>

          <form onSubmit={handleSubmit} className="mule-account-form">
            <div className="form-group">
              <label htmlFor="accountNumber">
                Account Number <span className="required">*</span>
              </label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="Enter account number"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="accountOpeningDate">
                Account Opening Date <span className="required">*</span>
              </label>
              <input
                type="date"
                id="accountOpeningDate"
                name="accountOpeningDate"
                value={formData.accountOpeningDate}
                onChange={handleChange}
                required
                className="form-input"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="accountHolderName">
                Account Holder Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="accountHolderName"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleChange}
                placeholder="Enter account holder's full name"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="remarks">
                Remarks <span className="required">*</span>
              </label>
              <textarea
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                placeholder="Explain why this account is considered a mule account (suspicious activities, unusual transactions, etc.)"
                required
                className="form-textarea"
                rows="5"
              />
              <small className="form-help">
                Provide detailed information about suspicious activities
              </small>
            </div>

            {error && (
              <div className="error-message">
                <i className="error-icon">⚠️</i>
                {error}
              </div>
            )}

            <div className="form-actions">
              <button 
                type="button" 
                onClick={handleCancel}
                className="cancel-button"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-button"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>

          <div className="info-notice">
            <strong>⚠️ Important Notice:</strong>
            <p>Once submitted, mule account information cannot be edited or deleted. Please ensure all details are accurate before submitting.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMuleAccountPage;
