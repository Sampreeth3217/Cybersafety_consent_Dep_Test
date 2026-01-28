import React, { useState } from 'react';
import { isValidToken } from '../utils/helpers';
import './ManagerSearchForm.css';

/**
 * ManagerSearchForm Component
 * Search for consent records by token
 */
const ManagerSearchForm = ({ onSearch, onLogout }) => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const upperToken = token.toUpperCase().trim();

    if (!upperToken) {
      setError('Please enter a token');
      return;
    }

    if (!isValidToken(upperToken)) {
      setError('Invalid token format. Token must be 7 alphanumeric characters.');
      return;
    }

    setIsLoading(true);
    try {
      await onSearch(upperToken);
    } catch (err) {
      setError(err.message || 'Search failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTokenChange = (e) => {
    // Convert to uppercase and limit to 7 characters
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 7);
    setToken(value);
    setError('');
  };

  return (
    <div className="manager-search-form">
      <div className="manager-search-form__header">
        <h2 className="manager-search-form__title">Search Consent Record</h2>
      </div>

      <form onSubmit={handleSubmit} className="manager-search-form__form">
        <div className="manager-search-form__field">
          <label className="manager-search-form__label">
            Enter 7-character Token
          </label>
          <input
            type="text"
            className="manager-search-form__input"
            value={token}
            onChange={handleTokenChange}
            placeholder="e.g., A9X2KQ7"
            maxLength={7}
            disabled={isLoading}
            autoFocus
          />
          {error && (
            <p className="manager-search-form__error">{error}</p>
          )}
        </div>

        <button
          type="submit"
          className="manager-search-form__button"
          disabled={isLoading || token.length !== 7}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
};

export default ManagerSearchForm;
