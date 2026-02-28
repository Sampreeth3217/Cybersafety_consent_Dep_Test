import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './BankAnalyticsPage.css';

const BankAnalyticsPage = () => {
  const navigate = useNavigate();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filterApplied, setFilterApplied] = useState(false);
  const [activeView, setActiveView] = useState('overview'); // overview, banks, branches, combinations

  const checkAuthentication = useCallback(async () => {
    const token = localStorage.getItem('policeToken');
    if (!token) {
      navigate('/cybersuraksha/police');
      return false;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/police/verify`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        localStorage.removeItem('policeToken');
        localStorage.removeItem('policeUsername');
        navigate('/cybersuraksha/police');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Auth error:', error);
      navigate('/cybersuraksha/police');
      return false;
    }
  }, [navigate]);

  const fetchAnalytics = useCallback(async () => {
    const token = localStorage.getItem('policeToken');
    if (!token) return;

    setLoading(true);
    try {
      let url = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/police/analytics/banks?`;
      
      if (startDate) url += `startDate=${startDate}&`;
      if (endDate) url += `endDate=${endDate}&`;
      if (selectedCategory) url += `category=${selectedCategory}&`;

      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const result = await response.json();
        setAnalyticsData(result.data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate, selectedCategory]);

  useEffect(() => {
    checkAuthentication().then(isAuth => {
      if (isAuth) {
        fetchAnalytics();
      }
    });
  }, [checkAuthentication, fetchAnalytics]);

  const handleApplyFilter = () => {
    setFilterApplied(startDate !== '' || endDate !== '' || selectedCategory !== '');
    fetchAnalytics();
  };

  const handleClearFilter = () => {
    setStartDate('');
    setEndDate('');
    setSelectedCategory('');
    setFilterApplied(false);
  };

  const handleBack = () => {
    navigate('/cybersuraksha/police/dashboard');
  };

  const getCategoryName = (category) => {
    const names = {
      'digital-arrest': 'Digital Arrest',
      'investment-fraud': 'Investment Fraud',
      'other-cybercrimes': 'Other Cybercrimes'
    };
    return names[category] || category;
  };

  if (loading) {
    return (
      <div className="bank-analytics-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bank-analytics-container">
      <div className="analytics-header">
        <div className="header-content">
          <div className="header-left">
            <div className="header-logo-icon">
              <img src="/CyberSurakshaLogo.png" alt="Cybersuraksha Logo" />
            </div>
            <div>
              <h1>Bank Analytics Dashboard</h1>
              <p className="header-subtitle">COMPREHENSIVE BANK PERFORMANCE ANALYSIS</p>
            </div>
          </div>
          <div className="header-right">
            <button onClick={handleBack} className="back-button">
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="analytics-content">
        {/* Filters Section */}
        <div className="filter-section">
          <h3>📊 Filters</h3>
          <div className="filter-controls">
            <div className="filter-inputs">
              <div className="filter-input-group">
                <label>From Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="date-input"
                />
              </div>
              <div className="filter-input-group">
                <label>To Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="date-input"
                />
              </div>
              <div className="filter-input-group">
                <label>Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="category-select"
                >
                  <option value="">All Categories</option>
                  <option value="digital-arrest">Digital Arrest</option>
                  <option value="investment-fraud">Investment Fraud</option>
                  <option value="other-cybercrimes">Other Cybercrimes</option>
                </select>
              </div>
              <div className="filter-button-group">
                <button onClick={handleApplyFilter} className="apply-filter-btn">
                  Apply Filter
                </button>
                {filterApplied && (
                  <button onClick={handleClearFilter} className="clear-filter-btn">
                    Clear Filter
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="overview-cards">
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-info">
              <h3>{analyticsData?.overview.totalRecords || 0}</h3>
              <p>Total Records</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏦</div>
            <div className="stat-info">
              <h3>{analyticsData?.overview.totalBanks || 0}</h3>
              <p>Total Banks</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏢</div>
            <div className="stat-info">
              <h3>{analyticsData?.overview.totalBranches || 0}</h3>
              <p>Total Branches</p>
            </div>
          </div>
        </div>

        {/* View Tabs */}
        <div className="view-tabs">
          <button
            className={`tab-button ${activeView === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveView('overview')}
          >
            Overview
          </button>
          <button
            className={`tab-button ${activeView === 'banks' ? 'active' : ''}`}
            onClick={() => setActiveView('banks')}
          >
            Top Banks
          </button>
          <button
            className={`tab-button ${activeView === 'combinations' ? 'active' : ''}`}
            onClick={() => setActiveView('combinations')}
          >
            Bank-Branch Analysis
          </button>
        </div>

        {/* Content based on active view */}
        <div className="analytics-view-content">
          {activeView === 'overview' && (
            <div className="overview-section">
              <h2>📈 Quick Overview</h2>
              <div className="overview-grid">
                <div className="overview-panel">
                  <h3>Top 5 Banks</h3>
                  <div className="ranking-list">
                    {analyticsData?.topBanks.slice(0, 5).map((bank, index) => (
                      <div key={index} className="ranking-item">
                        <span className="rank">#{index + 1}</span>
                        <span className="name">{bank.bankName}</span>
                        <span className="count">{bank.count} records</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="overview-panel">
                  <h3>Top 5 Bank-Branch Combinations</h3>
                  <div className="ranking-list">
                    {analyticsData?.bankBranchCombinations.slice(0, 5).map((combo, index) => (
                      <div key={index} className="ranking-item">
                        <span className="rank">#{index + 1}</span>
                        <span className="name">{combo.bankName} - {combo.branchName}</span>
                        <span className="count">{combo.count} records</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'banks' && (
            <div className="banks-section">
              <h2>🏦 Top Performing Banks</h2>
              <div className="table-container">
                <table className="analytics-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Bank Name</th>
                      <th>Total Records</th>
                      <th>Digital Arrest</th>
                      <th>Investment Fraud</th>
                      <th>Other Cybercrimes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData?.topBanks.map((bank, index) => (
                      <tr key={index}>
                        <td className="rank-cell">#{index + 1}</td>
                        <td className="bank-name-cell">{bank.bankName}</td>
                        <td className="count-cell">{bank.count}</td>
                        <td className="count-cell">{bank.digitalArrestCount}</td>
                        <td className="count-cell">{bank.investmentFraudCount}</td>
                        <td className="count-cell">{bank.otherCybercrimesCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeView === 'combinations' && (
            <div className="combinations-section">
              <h2>🔗 Bank-Branch Analysis</h2>
              <p className="section-description">Specific bank and branch combinations with record counts</p>
              <div className="table-container">
                <table className="analytics-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Bank Name</th>
                      <th>Branch Name</th>
                      <th>Total Records</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData?.bankBranchCombinations.map((combo, index) => (
                      <tr key={index}>
                        <td className="rank-cell">#{index + 1}</td>
                        <td className="bank-name-cell">{combo.bankName}</td>
                        <td className="branch-name-cell">{combo.branchName}</td>
                        <td className="count-cell">{combo.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BankAnalyticsPage;
