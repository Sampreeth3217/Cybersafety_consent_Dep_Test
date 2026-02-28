import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './PoliceDashboardPage.css';

const PoliceDashboardPage = () => {
  const navigate = useNavigate();
  const [policeInfo, setPoliceInfo] = useState({ username: '' });
  const [analyticsData, setAnalyticsData] = useState({
    todayEntries: 0,
    weekEntries: 0,
    monthEntries: 0,
    totalEntries: 0
  });
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState('daily'); // 'daily' or 'monthly'
  const [loading, setLoading] = useState(true);

  const checkAuthentication = useCallback(async () => {
    const token = localStorage.getItem('policeToken');
    const username = localStorage.getItem('policeUsername');

    console.log('Checking authentication...', { hasToken: !!token, username });

    if (!token || !username) {
      console.log('No token or username, redirecting to login');
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

      console.log('Authentication successful');
      setPoliceInfo({ username });
      return true;
    } catch (error) {
      console.error('Auth check error:', error);
      navigate('/cybersuraksha/police');
      return false;
    }
  }, [navigate]);

  const fetchAnalytics = useCallback(async () => {
    const token = localStorage.getItem('policeToken');
    if (!token) return;

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/police/analytics/summary`;
      console.log('Fetching analytics from:', apiUrl);
      
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Analytics response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Analytics data received:', data);
        setAnalyticsData(data.data);
      } else {
        const errorData = await response.json();
        console.error('Analytics error response:', errorData);
      }
    } catch (error) {
      console.error('Analytics fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchChartData = useCallback(async (type) => {
    const token = localStorage.getItem('policeToken');
    if (!token) return;

    try {
      const endpoint = type === 'daily' ? '/api/police/analytics/daily' : '/api/police/analytics/monthly';
      const apiUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}${endpoint}`;
      console.log('Fetching chart data from:', apiUrl);
      
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Chart data response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Chart data received:', data);
        setChartData(data.data);
      } else {
        const errorData = await response.json();
        console.error('Chart data error response:', errorData);
      }
    } catch (error) {
      console.error('Chart data fetch error:', error);
    }
  }, []);

  useEffect(() => {
    const initializePage = async () => {
      console.log('Initializing police dashboard page...');
      const isAuthenticated = await checkAuthentication();
      console.log('Authentication result:', isAuthenticated);
      
      if (isAuthenticated) {
        console.log('Fetching analytics and chart data...');
        await fetchAnalytics();
        await fetchChartData('daily');
        console.log('Data fetch complete');
      } else {
        console.log('Not authenticated, skipping data fetch');
      }
    };
    initializePage();
  }, [checkAuthentication, fetchAnalytics, fetchChartData]);

  const handleChartTypeChange = (type) => {
    setChartType(type);
    fetchChartData(type);
  };

  const handleLogout = () => {
    localStorage.removeItem('policeToken');
    localStorage.removeItem('policeUsername');
    navigate('/cybersuraksha/police');
  };

  const getMaxValue = () => {
    if (chartData.length === 0) return 10;
    return Math.max(...chartData.map(d => d.count), 10);
  };

  return (
    <div className="police-dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <div className="header-logo-icon">
              <img src="/CyberSurakshaLogo.png" alt="Cybersuraksha Logo" />
            </div>
            <div>
              <h1>Police Analytics Dashboard</h1>
              <p className="header-subtitle">CYBERSURAKSHA - CUSTOMER CYBERSAFETY VERIFICATION SYSTEM</p>
            </div>
          </div>
          <div className="header-right">
            <p className="username">Welcome, {policeInfo.username}</p>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Analytics Hero Section */}
        <div className="analytics-hero">
          <h2 className="section-title">Consent Records Overview</h2>
          <div className="analytics-cards">
            <div className="analytics-card today">
              <div className="card-icon">📅</div>
              <div className="card-content">
                <h3>{analyticsData.todayEntries}</h3>
                <p>Today's Entries</p>
              </div>
            </div>
            <div className="analytics-card week">
              <div className="card-icon">📊</div>
              <div className="card-content">
                <h3>{analyticsData.weekEntries}</h3>
                <p>Entries This Week</p>
              </div>
            </div>
            <div className="analytics-card month">
              <div className="card-icon">📈</div>
              <div className="card-content">
                <h3>{analyticsData.monthEntries}</h3>
                <p>Entries This Month</p>
              </div>
            </div>
            <div className="analytics-card total">
              <div className="card-icon">💯</div>
              <div className="card-content">
                <h3>{analyticsData.totalEntries}</h3>
                <p>Total Entries</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="chart-section">
          <div className="chart-header">
            <h2 className="section-title">Consent Records Timeline</h2>
            <div className="chart-controls">
              <button 
                className={`chart-toggle ${chartType === 'daily' ? 'active' : ''}`}
                onClick={() => handleChartTypeChange('daily')}
              >
                Daily (30 Days)
              </button>
              <button 
                className={`chart-toggle ${chartType === 'monthly' ? 'active' : ''}`}
                onClick={() => handleChartTypeChange('monthly')}
              >
                Monthly (12 Months)
              </button>
            </div>
          </div>
          
          <div className="chart-container">
            {chartData.length === 0 ? (
              <div className="no-data">No data available for the selected period</div>
            ) : (
              <div className="line-chart">
                <div className="chart-y-axis">
                  {[...Array(6)].map((_, i) => {
                    const value = Math.round((getMaxValue() / 5) * (5 - i));
                    return (
                      <div key={i} className="y-axis-label">{value}</div>
                    );
                  })}
                </div>
                <div className="chart-scroll-wrapper">
                  <div className="chart-plot-area" style={{ minWidth: chartType === 'daily' ? `${chartData.length * 40}px` : '100%' }}>
                    <svg viewBox="0 0 1000 350" preserveAspectRatio="none" className="chart-svg">
                      {/* Grid lines */}
                      {[...Array(6)].map((_, i) => (
                        <line
                          key={`grid-${i}`}
                          x1="0"
                          y1={i * 70}
                          x2="1000"
                          y2={i * 70}
                          stroke="#e5e7eb"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                      ))}
                      
                      {/* Area fill under line */}
                      <defs>
                        <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05"/>
                        </linearGradient>
                      </defs>
                      
                      {chartData.length > 0 && (
                        <polygon
                          fill="url(#areaGradient)"
                          points={`0,350 ${chartData.map((d, i) => {
                            const x = (i / Math.max(chartData.length - 1, 1)) * 1000;
                            const y = 350 - ((d.count / getMaxValue()) * 320);
                            return `${x},${y}`;
                          }).join(' ')} 1000,350`}
                        />
                      )}
                      
                      {/* Line path */}
                      <polyline
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        vectorEffect="non-scaling-stroke"
                        points={chartData.map((d, i) => {
                          const x = (i / Math.max(chartData.length - 1, 1)) * 1000;
                          const y = 350 - ((d.count / getMaxValue()) * 320);
                          return `${x},${y}`;
                        }).join(' ')}
                      />
                      
                      {/* Data points */}
                      {chartData.map((d, i) => {
                        const x = (i / Math.max(chartData.length - 1, 1)) * 1000;
                        const y = 350 - ((d.count / getMaxValue()) * 320);
                        return (
                          <g key={i}>
                            <circle
                              cx={x}
                              cy={y}
                              r="6"
                              fill="white"
                              stroke="#3b82f6"
                              strokeWidth="3"
                              vectorEffect="non-scaling-stroke"
                            />
                            <title>{`${d._id}: ${d.count} entries`}</title>
                          </g>
                        );
                      })}
                    </svg>
                    
                    <div className="chart-x-axis">
                      {chartData.map((d, i) => {
                        return (
                          <div key={i} className="x-axis-label">
                            {chartType === 'daily' 
                              ? d._id.split('-').slice(1).join('/')
                              : d._id.split('-')[1] + '/' + d._id.split('-')[0].slice(-2)
                            }
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="action-cards">
          <div 
            className="action-card records-card"
            onClick={() => navigate('/cybersuraksha/police/all-records')}
          >
            <div className="card-icon">📋</div>
            <h2>All Records</h2>
            <p>View all consent records in detail</p>
          </div>
          <div 
            className="action-card analytics-card"
            onClick={() => navigate('/cybersuraksha/police/bank-analytics')}
          >
            <div className="card-icon">📊</div>
            <h2>Bank Analytics</h2>
            <p>Comprehensive bank performance analysis</p>
          </div>
          <div 
            className="action-card mule-card"
            onClick={() => navigate('/cybersuraksha/police/mule-accounts')}
          >
            <div className="card-icon">🚨</div>
            <h2>Mule Accounts</h2>
            <p>View and manage all reported mule accounts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliceDashboardPage;
