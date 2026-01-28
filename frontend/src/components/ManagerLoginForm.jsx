import React, { useState } from 'react';
import './ManagerLoginForm.css';

/**
 * ManagerLoginForm Component
 * Authentication form for manager access
 */
const ManagerLoginForm = ({ onLogin, error: externalError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    try {
      await onLogin({ username, password });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="manager-login-form">
      <div className="manager-login-form__container">
        <h2 className="manager-login-form__title">Manager Login</h2>
        <p className="manager-login-form__subtitle">
          Authorized personnel only
        </p>

        <form onSubmit={handleSubmit}>
          <div className="manager-login-form__field">
            <label className="manager-login-form__label">Username</label>
            <input
              type="text"
              className="manager-login-form__input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              autoComplete="username"
              autoFocus
            />
          </div>

          <div className="manager-login-form__field">
            <label className="manager-login-form__label">Password</label>
            <input
              type="password"
              className="manager-login-form__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>

          {(error || externalError) && (
            <p className="manager-login-form__error">
              {error || externalError}
            </p>
          )}

          <button
            type="submit"
            className="manager-login-form__button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManagerLoginForm;
