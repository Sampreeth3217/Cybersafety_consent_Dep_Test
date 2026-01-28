import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewMuleAccountsPage.css';

const ViewMuleAccountsPage = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bankerIfsc, setBankerIfsc] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('bankerToken');
    const ifscCode = localStorage.getItem('bankerIfscCode');

    if (!token || !ifscCode) {
      navigate('/cybersuraksha/banker');
      return;
    }

    setBankerIfsc(ifscCode);
    fetchAccounts();
  }, [navigate]);

  const fetchAccounts = async () => {
    const token = localStorage.getItem('bankerToken');
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/mule-account/list`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setAccounts(data.data.accounts);
      } else {
        setError(data.message || 'Failed to fetch accounts');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleBack = () => {
    navigate('/cybersuraksha/banker/dashboard');
  };

  const handleAddNew = () => {
    navigate('/cybersuraksha/banker/add-mule-account');
  };

  return (
    <div className="view-mule-accounts-container">
      <div className="view-mule-header">
        <button onClick={handleBack} className="back-button">
          ← Back to Dashboard
        </button>
        <div className="header-info">
          <h1>Mule Accounts Database</h1>
          <p className="bank-ifsc">IFSC: {bankerIfsc}</p>
        </div>
      </div>

      <div className="view-mule-content">
        <div className="content-header">
          <div className="header-left">
            <h2>All Reported Accounts</h2>
            <p className="accounts-count">
              {accounts.length} {accounts.length === 1 ? 'account' : 'accounts'} reported
            </p>
          </div>
          <button onClick={handleAddNew} className="add-new-button">
            ➕ Add New Account
          </button>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading accounts...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <p>{error}</p>
            <button onClick={fetchAccounts} className="retry-button">
              Retry
            </button>
          </div>
        ) : accounts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No Mule Accounts Reported Yet</h3>
            <p>You haven't reported any mule accounts. Click the button below to add your first report.</p>
            <button onClick={handleAddNew} className="add-first-button">
              Add First Account
            </button>
          </div>
        ) : (
          <div className="accounts-grid">
            {accounts.map((account, index) => (
              <div key={account._id || index} className="account-card">
                <div className="card-header">
                  <div className="card-number">#{accounts.length - index}</div>
                  <div className="card-date">{formatDate(account.addedAt)}</div>
                </div>
                
                <div className="card-body">
                  <div className="info-row">
                    <span className="info-label">Account Number</span>
                    <span className="info-value account-num">{account.accountNumber}</span>
                  </div>
                  
                  <div className="info-row">
                    <span className="info-label">Account Holder</span>
                    <span className="info-value">{account.accountHolderName}</span>
                  </div>
                  
                  <div className="info-row">
                    <span className="info-label">Opening Date</span>
                    <span className="info-value">{formatDate(account.accountOpeningDate)}</span>
                  </div>
                  
                  <div className="remarks-section">
                    <span className="remarks-label">Remarks</span>
                    <p className="remarks-text">{account.remarks}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewMuleAccountsPage;
