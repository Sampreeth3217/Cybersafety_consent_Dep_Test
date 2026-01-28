import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './PoliceMuleAccountsPage.css';

const PoliceMuleAccountsPage = () => {
  const navigate = useNavigate();
  const [muleAccounts, setMuleAccounts] = useState([]);
  const [stats, setStats] = useState({ total: 0, byBank: [] });
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBank, setFilterBank] = useState('');

  const checkAuthentication = useCallback(async () => {
    const token = localStorage.getItem('policeToken');
    
    console.log('Checking mule accounts page authentication...', { hasToken: !!token });
    
    if (!token) {
      console.log('No token, redirecting to login');
      navigate('/cybersuraksha/police');
      return false;
    }

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/police/verify`;
      console.log('Verifying token at:', apiUrl);
      
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Auth verification response status:', response.status);

      if (!response.ok) {
        console.log('Token invalid, clearing and redirecting');
        localStorage.removeItem('policeToken');
        localStorage.removeItem('policeUsername');
        navigate('/cybersuraksha/police');
        return false;
      }
      
      console.log('Authentication successful for mule accounts page');
      return true;
    } catch (error) {
      console.error('Auth check error:', error);
      navigate('/cybersuraksha/police');
      return false;
    }
  }, [navigate]);

  const fetchMuleAccounts = useCallback(async () => {
    const token = localStorage.getItem('policeToken');
    if (!token) return;

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/police/analytics/mule-accounts`;
      console.log('Fetching mule accounts from:', apiUrl);
      
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Mule accounts response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Mule accounts data received:', data);
        setMuleAccounts(data.data.accounts || []);
      } else {
        const errorData = await response.json();
        console.error('Mule accounts error response:', errorData);
      }
    } catch (error) {
      console.error('Mule accounts fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    const token = localStorage.getItem('policeToken');
    if (!token) return;

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/police/analytics/mule-accounts/stats`;
      console.log('Fetching mule account stats from:', apiUrl);
      
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Stats response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Stats data received:', data);
        setStats(data.data);
      } else {
        const errorData = await response.json();
        console.error('Stats error response:', errorData);
      }
    } catch (error) {
      console.error('Stats fetch error:', error);
    }
  }, []);

  useEffect(() => {
    const initializePage = async () => {
      console.log('Initializing mule accounts page...');
      const isAuthenticated = await checkAuthentication();
      console.log('Mule accounts page authentication result:', isAuthenticated);
      
      if (isAuthenticated) {
        console.log('Fetching mule accounts and stats...');
        await fetchMuleAccounts();
        await fetchStats();
        console.log('Mule accounts data fetch complete');
      } else {
        console.log('Not authenticated, skipping mule accounts fetch');
      }
    };
    initializePage();
  }, [checkAuthentication, fetchMuleAccounts, fetchStats]);

  const handleDelete = async (accountId) => {
    if (!confirm('Are you sure you want to delete this mule account record?')) {
      return;
    }

    const token = localStorage.getItem('policeToken');
    if (!token) return;

    setDeleteLoading(accountId);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/police/analytics/mule-accounts/${accountId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // Remove from local state
        setMuleAccounts(prev => prev.filter(acc => acc._id !== accountId));
        // Refresh stats
        fetchStats();
        alert('Mule account record deleted successfully');
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to delete record');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Network error. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  };

  const filteredAccounts = muleAccounts.filter(account => {
    const matchesSearch = 
      account.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountHolderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.bankIfscCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBank = !filterBank || account.bankIfscCode === filterBank;
    
    return matchesSearch && matchesBank;
  });

  const uniqueBanks = [...new Set(muleAccounts.map(acc => acc.bankIfscCode))].sort();

  return (
    <div className="police-mule-container">
      <div className="mule-header">
        <div className="header-content">
          <div className="header-logo-section">
            <div className="header-logo-icon">
              <img src="/CyberSurakshaLogo.png" alt="Cybersuraksha Logo" />
            </div>
            <div className="header-logo-text">
              <h1>Mule Accounts Management</h1>
              <p className="header-subtitle">CYBERSURAKSHA - CUSTOMER CYBERSAFETY VERIFICATION SYSTEM</p>
            </div>
          </div>
          <button onClick={() => navigate('/cybersuraksha/police/dashboard')} className="back-button">
            ← Back to Dashboard
          </button>
        </div>
      </div>

      <div className="mule-content">
        {/* Stats Section */}
        <div className="stats-overview">
          <div className="stat-card total">
            <div className="stat-icon">🚨</div>
            <div className="stat-info">
              <h3>{stats.total}</h3>
              <p>Total Mule Accounts</p>
            </div>
          </div>
          <div className="stat-card banks">
            <div className="stat-icon">🏦</div>
            <div className="stat-info">
              <h3>{uniqueBanks.length}</h3>
              <p>Banks Involved</p>
            </div>
          </div>
        </div>

        {/* Top Banks Section */}
        {stats.byBank && stats.byBank.length > 0 && (
          <div className="top-banks-section">
            <h2>Top Banks by Mule Accounts</h2>
            <div className="bank-stats-grid">
              {stats.byBank.slice(0, 5).map((bank, index) => (
                <div key={index} className="bank-stat-item">
                  <div className="bank-rank">#{index + 1}</div>
                  <div className="bank-info">
                    <strong>{bank.ifscCode}</strong>
                    <span>{bank.count} accounts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters Section */}
        <div className="filters-section">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by account number, holder name, or IFSC code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <select 
            value={filterBank} 
            onChange={(e) => setFilterBank(e.target.value)}
            className="bank-filter"
          >
            <option value="">All Banks</option>
            {uniqueBanks.map(bank => (
              <option key={bank} value={bank}>{bank}</option>
            ))}
          </select>
        </div>

        {/* Accounts Table */}
        <div className="accounts-section">
          <div className="section-header">
            <h2>All Mule Accounts ({filteredAccounts.length})</h2>
          </div>

          {loading ? (
            <div className="loading-state">Loading mule accounts...</div>
          ) : filteredAccounts.length === 0 ? (
            <div className="empty-state">
              {searchTerm || filterBank ? 'No matching accounts found' : 'No mule accounts reported yet'}
            </div>
          ) : (
            <div className="table-container">
              <table className="mule-accounts-table">
                <thead>
                  <tr>
                    <th>Account Number</th>
                    <th>Account Holder</th>
                    <th>Opening Date</th>
                    <th>Bank IFSC</th>
                    <th>Reported Date</th>
                    <th>Remarks</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.map((account) => (
                    <tr key={account._id}>
                      <td>
                        <strong>{account.accountNumber}</strong>
                      </td>
                      <td>{account.accountHolderName}</td>
                      <td>{new Date(account.accountOpeningDate).toLocaleDateString()}</td>
                      <td>
                        <span className="ifsc-badge">{account.bankIfscCode}</span>
                      </td>
                      <td>{new Date(account.addedAt).toLocaleDateString()}</td>
                      <td>
                        <div className="remarks-cell">
                          {account.remarks || 'N/A'}
                        </div>
                      </td>
                      <td>
                        <button 
                          onClick={() => handleDelete(account._id)}
                          className="delete-button"
                          disabled={deleteLoading === account._id}
                        >
                          {deleteLoading === account._id ? '...' : '🗑️ Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PoliceMuleAccountsPage;
