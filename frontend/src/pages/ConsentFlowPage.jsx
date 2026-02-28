import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatementReader from '../components/StatementReader';
import { getStatements } from '../config/statements';
import { ROUTES, ERROR_MESSAGES } from '../config/constants';
import { submitConsent } from '../services/apiClient';
import { isSpeechRecognitionSupported } from '../services/speechRecognition';
import './ConsentFlowPage.css';

/**
 * ConsentFlowPage Component
 * Main flow for reading and verifying statements
 */
const ConsentFlowPage = () => {
  const navigate = useNavigate();
  const [consentData, setConsentData] = useState(null);
  const [statements, setStatements] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load consent data from sessionStorage
    const storedData = sessionStorage.getItem('consentData');
    
    if (!storedData) {
      navigate(ROUTES.HOME);
      return;
    }

    try {
      const data = JSON.parse(storedData);
      
      console.log('Loaded consent data:', data);
      console.log('Mobile number in data:', data.mobileNumber);
      console.log('Data has mobileNumber?', !!data.mobileNumber);
      
      // Validate that mobile number exists (required field added in update)
      if (!data.mobileNumber) {
        console.warn('Mobile number missing from consent data, redirecting to home');
        console.warn('Full data object:', JSON.stringify(data));
        sessionStorage.removeItem('consentData');
        navigate(ROUTES.HOME);
        return;
      }
      
      setConsentData(data);
      setStatements(getStatements(data.language, data.category || 'digital-arrest'));
      setCurrentIndex(data.currentStatementIndex || 0);
    } catch (err) {
      console.error('Error loading consent data:', err);
      navigate(ROUTES.HOME);
    }
  }, [navigate]);

  useEffect(() => {
    // Save progress to sessionStorage
    if (consentData) {
      sessionStorage.setItem('consentData', JSON.stringify({
        ...consentData,
        currentStatementIndex: currentIndex
      }));
    }
  }, [currentIndex, consentData]);

  const handleStatementComplete = () => {
    if (currentIndex < statements.length - 1) {
      // Move to next statement
      setCurrentIndex(prev => prev + 1);
      setError(null);
    } else {
      // All statements completed, submit to backend
      handleSubmitConsent();
    }
  };

  const handleSubmitConsent = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await submitConsent({
        name: consentData.name,
        mobileNumber: consentData.mobileNumber,
        token: consentData.token,
        language: consentData.language,
        category: consentData.category || 'digital-arrest',
        bankName: consentData.bankName || '',
        bankBranch: consentData.bankBranch || ''
      });

      if (response.success) {
        // Navigate to confirmation page
        navigate(ROUTES.CONFIRMATION, {
          state: {
            name: consentData.name,
            mobileNumber: consentData.mobileNumber,
            token: consentData.token,
            language: consentData.language,
            category: consentData.category || 'digital-arrest',
            bankName: consentData.bankName || '',
            bankBranch: consentData.bankBranch || ''
          }
        });
      }
    } catch (err) {
      console.error('Error submitting consent:', err);
      console.error('Error message:', err.message);
      console.error('Error status:', err.status);
      console.error('Error data:', err.data);
      setError(err.message || ERROR_MESSAGES[consentData.language].serverError);
      setIsSubmitting(false);
    }
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  if (!consentData || statements.length === 0) {
    return (
      <div className="consent-flow-page consent-flow-page--loading">
        <div className="consent-flow-page__loading">
          <div className="consent-flow-page__spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isSpeechRecognitionSupported()) {
    return (
      <div className="consent-flow-page consent-flow-page--error">
        <div className="consent-flow-page__error-card">
          <div className="consent-flow-page__error-icon-large">⚠️</div>
          <h2 className="consent-flow-page__error-title">
            {consentData.language === 'en' 
              ? 'Browser Not Supported' 
              : 'బ్రౌజర్ మద్దతు లేదు'}
          </h2>
          <p className="consent-flow-page__error-message">{ERROR_MESSAGES[consentData.language].noSpeechRecognition}</p>
        </div>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="consent-flow-page consent-flow-page--loading">
        <div className="consent-flow-page__submitting">
          <div className="consent-flow-page__spinner"></div>
          <p className="consent-flow-page__submitting-text">
            {consentData.language === 'en' 
              ? 'Submitting your consent...' 
              : 'మీ సమ్మతిని సమర్పిస్తోంది...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="consent-flow-page">
      <header className="consent-flow-page__header-bar">
        <div className="consent-flow-page__header-content">
          <div className="consent-flow-page__logo">
            <div className="consent-flow-page__logo-icon">
              <img src="/CyberSurakshaLogo.png" alt="AP Police Logo" />
            </div>
            <div className="consent-flow-page__logo-text">
              <div className="consent-flow-page__logo-title">NTR Police Commissionerate, Vijayawada, Andhra Pradesh</div>
              <div className="confirmation-page__logo-subtitle">CYBERSURAKSHA - CUSTOMER CYBERSAFETY VERIFICATION SYSTEM</div>
            </div>
          </div>
        </div>
      </header>

      <div className="consent-flow-page__main">
        <div className="consent-flow-page__container">
          <div className="consent-flow-page__title-section">
            <h1 className="consent-flow-page__title">
              {consentData.language === 'en' 
                ? 'Cybersafety Statements' 
                : 'సైబర్ భద్రత ప్రకటనలు'}
            </h1>
            <p className="consent-flow-page__name">
              {consentData.language === 'en' ? 'Name:' : 'పేరు:'} <strong>{consentData.name}</strong>
            </p>
          </div>

          {error && (
            <div className="consent-flow-page__error-banner">
              <span className="consent-flow-page__error-icon">⚠️</span>
              {error}
            </div>
          )}

          <div className="consent-flow-page__progress-section">
            <div className="consent-flow-page__progress-header">
              <span className="consent-flow-page__progress-text">
                {consentData.language === 'en' 
                  ? `Statement ${currentIndex + 1} of ${statements.length}` 
                  : `వాక్యం ${currentIndex + 1} / ${statements.length}`}
              </span>
              <span className="consent-flow-page__progress-percentage">
                {Math.round(((currentIndex + 1) / statements.length) * 100)}%
              </span>
            </div>
            <div className="consent-flow-page__progress-bar">
              <div
                className="consent-flow-page__progress-fill"
                style={{
                  width: `${((currentIndex + 1) / statements.length) * 100}%`
                }}
              />
            </div>
          </div>

          <StatementReader
            statements={statements}
            currentIndex={currentIndex}
            language={consentData.language}
            onStatementComplete={handleStatementComplete}
            onError={handleError}
          />
        </div>
      </div>

      <footer className="consent-flow-page__footer">
        <p>© 2025 NTR Police Commissionerate, Vijayawada, Andhra Pradesh, India — CYBERSURAKSHA </p>
      </footer>
    </div>
  );
};

export default ConsentFlowPage;