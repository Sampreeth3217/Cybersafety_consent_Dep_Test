import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BankerDashboardPage.css';

const BankerDashboardPage = () => {
  const navigate = useNavigate();
  const [bankerInfo, setBankerInfo] = useState({ ifscCode: '' });
  const [stats, setStats] = useState({ totalAccounts: 0, recentAccounts: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthentication();
    fetchStats();
  }, []);

  const checkAuthentication = async () => {
    const token = localStorage.getItem('bankerToken');
    const ifscCode = localStorage.getItem('bankerIfscCode');

    if (!token || !ifscCode) {
      navigate('/cybersuraksha/banker');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/banker/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        localStorage.removeItem('bankerToken');
        localStorage.removeItem('bankerIfscCode');
        navigate('/cybersuraksha/banker');
        return;
      }

      setBankerInfo({ ifscCode });
    } catch (error) {
      console.error('Auth check error:', error);
      navigate('/cybersuraksha/banker');
    }
  };

  const fetchStats = async () => {
    const token = localStorage.getItem('bankerToken');
    if (!token) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/mule-account/stats/summary`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.data);
      }
    } catch (error) {
      console.error('Stats fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('bankerToken');
    localStorage.removeItem('bankerIfscCode');
    navigate('/cybersuraksha/banker');
  };

  return (
    <div className="banker-dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Banker Dashboard</h1>
            <p className="bank-ifsc">IFSC: {bankerInfo.ifscCode}</p>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="stats-card">
          <div className="stat-item">
            <div className="stat-icon">📊</div>
            <div className="stat-details">
              <h3>{stats.totalAccounts}</h3>
              <p>Total Mule Accounts Reported</p>
            </div>
          </div>
        </div>

        <div className="action-cards">
          <div 
            className="action-card add-card"
            onClick={() => navigate('/cybersuraksha/banker/add-mule-account')}
          >
            <div className="card-icon">➕</div>
            <h2>Add Mule Account Info</h2>
            <p>Report a new suspicious mule account</p>
          </div>

          <div 
            className="action-card view-card"
            onClick={() => navigate('/cybersuraksha/banker/view-mule-accounts')}
          >
            <div className="card-icon">👁️</div>
            <h2>View Mule Accounts</h2>
            <p>View all previously reported accounts</p>
          </div>
        </div>

        {stats.recentAccounts && stats.recentAccounts.length > 0 && (
          <div className="recent-activity">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {stats.recentAccounts.slice(0, 3).map((account, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-info">
                    <strong>{account.accountHolderName}</strong>
                    <span className="account-number">A/C: {account.accountNumber}</span>
                  </div>
                  <div className="activity-date">
                    {new Date(account.addedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankerDashboardPage;
