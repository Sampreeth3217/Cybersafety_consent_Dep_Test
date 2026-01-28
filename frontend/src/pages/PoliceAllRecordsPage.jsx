import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './PoliceAllRecordsPage.css';

const PoliceAllRecordsPage = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterApplied, setFilterApplied] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const recordsPerPage = 50;

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

  const fetchRecords = useCallback(async () => {
    const token = localStorage.getItem('policeToken');
    if (!token) return;

    setLoading(true);
    try {
      let url = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/police/all-records?page=${currentPage}&limit=${recordsPerPage}`;
      
      if (startDate) {
        url += `&startDate=${startDate}`;
      }
      if (endDate) {
        url += `&endDate=${endDate}`;
      }

      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setRecords(data.records || []);
        setTotalPages(data.pagination.totalPages || 1);
        setTotalRecords(data.pagination.totalRecords || 0);
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, startDate, endDate]);

  useEffect(() => {
    checkAuthentication().then(isAuth => {
      if (isAuth) {
        fetchRecords();
      }
    });
  }, [checkAuthentication, fetchRecords]);

  const handleLogout = () => {
    localStorage.removeItem('policeToken');
    localStorage.removeItem('policeUsername');
    navigate('/cybersuraksha/police');
  };

  const handleBack = () => {
    navigate('/cybersuraksha/police/dashboard');
  };

  const handleApplyFilter = () => {
    setCurrentPage(1);
    setFilterApplied(startDate !== '' || endDate !== '');
  };

  const handleClearFilter = () => {
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
    setFilterApplied(false);
  };

  const downloadCSV = async (type) => {
    const token = localStorage.getItem('policeToken');
    if (!token) return;

    setDownloadLoading(true);
    try {
      let url = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/police/all-records/csv`;
      
      if (type === 'filtered') {
        if (startDate) {
          url += `?startDate=${startDate}`;
        }
        if (endDate) {
          url += `${startDate ? '&' : '?'}endDate=${endDate}`;
        }
      }

      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `consent-records-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(a);
      } else {
        alert('Failed to download CSV');
      }
    } catch (error) {
      console.error('Error downloading CSV:', error);
      alert('Error downloading CSV');
    } finally {
      setDownloadLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredRecords = records.filter(record => 
    searchTerm === '' || 
    record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.mobileNumber?.includes(searchTerm)
  );

  return (
    <div className="police-all-records-container">
      <div className="records-header">
        <div className="header-content">
          <div className="header-left">
            <div className="header-logo-icon">
              <img src="/CyberSurakshaLogo.png" alt="Cybersuraksha Logo" />
            </div>
            <div>
              <h1>All Consent Records</h1>
              <p className="header-subtitle">CYBERSURAKSHA - CUSTOMER CYBERSAFETY VERIFICATION SYSTEM</p>
            </div>
          </div>
          <div className="header-right">
            <button onClick={handleBack} className="back-button">
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="records-content">
        {/* Filter and Download Section */}
        <div className="filter-section">
          <div className="filter-controls">
            <h3>Filter by Date Range</h3>
            <div className="filter-inputs">
              <div className="date-input-group">
                <label>From Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="date-input"
                />
              </div>
              <div className="date-input-group">
                <label>To Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="date-input"
                />
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

          <div className="download-section">
            <h3>Download Records</h3>
            <div className="download-buttons">
              {filterApplied && (
                <button 
                  onClick={() => downloadCSV('filtered')} 
                  disabled={downloadLoading}
                  className="download-btn filtered"
                  title="Download current filtered results"
                >
                  {downloadLoading ? '⏳ Downloading...' : '📥 Download Filtered Results'}
                </button>
              )}
              <button 
                onClick={() => downloadCSV('all')} 
                disabled={downloadLoading}
                className="download-btn all"
                title="Download all records"
              >
                {downloadLoading ? '⏳ Downloading...' : '📥 Download All Records'}
              </button>
            </div>
          </div>
        </div>

        {/* Search and Info Section */}
        <div className="records-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by name, token, or mobile number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          <div className="records-info">
            <p>Total Records: <strong>{totalRecords}</strong></p>
            {filterApplied && <p className="filter-badge">Filter Applied</p>}
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading records...</p>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="no-records">
            <p>No records found</p>
          </div>
        ) : (
          <>
            <div className="table-container">
              <table className="records-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Token</th>
                    <th>Name</th>
                    <th>Mobile Number</th>
                    <th>Language</th>
                    <th>Created At</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record, index) => (
                    <tr key={record._id}>
                      <td>{(currentPage - 1) * recordsPerPage + index + 1}</td>
                      <td className="token-cell">{record.token}</td>
                      <td>{record.name}</td>
                      <td className="mobile-cell">{record.mobileNumber || 'N/A'}</td>
                      <td>
                        <span className={`language-badge ${record.language}`}>
                          {record.language === 'en' ? 'English' : 'Telugu'}
                        </span>
                      </td>
                      <td className="date-cell">{formatDate(record.createdAt)}</td>
                      <td>
                        <span className="status-badge verified">
                          ✓ Verified
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="pagination-button"
                >
                  ← Previous
                </button>
                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="pagination-button"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PoliceAllRecordsPage;
