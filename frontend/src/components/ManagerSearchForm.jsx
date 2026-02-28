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
      setError('Invalid token format. Enter legacy 7-character token or new format (D-/I-/O-XXXXXXX).');
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
    // Convert to uppercase and limit to 9 characters (prefix + 7 chars)
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, '').substring(0, 9);
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
            Enter Token
          </label>
          <input
            type="text"
            className="manager-search-form__input"
            value={token}
            onChange={handleTokenChange}
            placeholder="e.g., D-A9X2KQ7 or A9X2KQ7"
            maxLength={9}
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
          disabled={isLoading || (token.length !== 7 && token.length !== 9)}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
};

export default ManagerSearchForm;
