import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/constants';
import { copyToClipboard } from '../utils/helpers';
import './ConfirmationPage.css';

/**
 * ConfirmationPage Component
 * Shows completion message with token
 */
  const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [consentData, setConsentData] = useState(null);

  useEffect(() => {
    // Get data from navigation state or sessionStorage
    if (location.state) {
      setConsentData(location.state);
    } else {
      const storedData = sessionStorage.getItem('consentData');
      if (storedData) {
        try {
          setConsentData(JSON.parse(storedData));
        } catch (err) {
          navigate(ROUTES.HOME);
        }
      } else {
        navigate(ROUTES.HOME);
      }
    }
  }, [location, navigate]);

  const handleCopyToken = async () => {
    if (consentData && consentData.token) {
      const success = await copyToClipboard(consentData.token);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleStartNew = () => {
    sessionStorage.removeItem('consentData');
    navigate(ROUTES.HOME);
  };

  if (!consentData) {
    return (
      <div className="confirmation-page confirmation-page--loading">
        <div className="confirmation-page__loading">
          <div className="confirmation-page__spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const content = {
    en: {
      title: 'Consent Completed Successfully!',
      message: 'Thank you for completing all cybersafety statements.',
      instruction: 'Please share this reference code with the bank staff:',
      tokenLabel: 'Your Reference Code',
      copyButton: 'Copy Code',
      copiedMessage: 'Copied!',
      important: 'Important',
      importantMessage: 'Please keep this code safe. You may need it for verification.',
      nextSteps: 'Next Steps',
      nextStepsMessage: 'Show this code to the bank staff to proceed with your transaction.',
      startNewButton: 'Start New Session'
    },
    te: {
      title: 'సమ్మతి విజయవంతంగా పూర్తయింది!',
      message: 'అన్ని సైబర్ భద్రత ప్రకటనలను పూర్తి చేసినందుకు ధన్యవాదాలు.',
      instruction: 'దయచేసి ఈ రిఫరెన్స్ కోడ్‌ను బ్యాంక్ సిబ్బందితో పంచుకోండి:',
      tokenLabel: 'మీ రిఫరెన్స్ కోడ్',
      copyButton: 'కోడ్ కాపీ చేయండి',
      copiedMessage: 'కాపీ చేయబడింది!',
      important: 'ముఖ్యమైనది',
      importantMessage: 'దయచేసి ఈ కోడ్‌ను సురక్షితంగా ఉంచండి. ధృవీకరణ కోసం మీకు ఇది అవసరం కావచ్చు.',
      nextSteps: 'తదుపరి దశలు',
      nextStepsMessage: 'మీ లావాదేవీని కొనసాగించడానికి బ్యాంక్ సిబ్బందికి ఈ కోడ్‌ను చూపండి.',
      startNewButton: 'కొత్త సెషన్ ప్రారంభించండి'
    }
  };

  const text = content[consentData.language] || content.en;

  return (
    <div className="confirmation-page">
      <header className="confirmation-page__header-bar">
        <div className="confirmation-page__header-content">
          <div className="confirmation-page__logo">
            <div className="confirmation-page__logo-icon">
              <img src="/ap-police-logo.png" alt="AP Police Logo" />
            </div>
            <div className="confirmation-page__logo-text">
              <div className="confirmation-page__logo-title">Cybercrime Department, NTR</div>
              <div className="confirmation-page__logo-subtitle">CYBERSURAKSHA - CUSTOMER CYBERSAFETY VERIFICATION SYSTEM</div>
            </div>
          </div>
        </div>
      </header>

      <div className="confirmation-page__main">
        <div className="confirmation-page__container">
          <div className="confirmation-page__success-card">
            <div className="confirmation-page__success-icon">
              ✓
            </div>

            <h1 className="confirmation-page__title">{text.title}</h1>
            <p className="confirmation-page__message">{text.message}</p>
          </div>

          <div className="confirmation-page__token-card">
            <p className="confirmation-page__instruction">{text.instruction}</p>
            
            <div className="confirmation-page__token-box">
              <label className="confirmation-page__token-label">
                {text.tokenLabel}
              </label>
              <div className="confirmation-page__token-display">
                <span className="confirmation-page__token">
                  {consentData.token}
                </span>
              </div>
              <button
                className="confirmation-page__copy-button"
                onClick={handleCopyToken}
              >
                {copied ? '✓ ' + text.copiedMessage : '📋 ' + text.copyButton}
              </button>
            </div>
          </div>

          <div className="confirmation-page__info">
            <div className="confirmation-page__info-box">
              <h3 className="confirmation-page__info-title">
                ⚠️ {text.important}
              </h3>
              <p className="confirmation-page__info-text">
                {text.importantMessage}
              </p>
            </div>

            <div className="confirmation-page__info-box">
              <h3 className="confirmation-page__info-title">
                📋 {text.nextSteps}
              </h3>
              <p className="confirmation-page__info-text">
                {text.nextStepsMessage}
              </p>
            </div>
          </div>

          <button
            className="confirmation-page__new-button"
            onClick={handleStartNew}
          >
            {text.startNewButton}
          </button>
        </div>
      </div>

      <footer className="confirmation-page__footer">
        <p>© 2025 NTR Police Commissionerate, Vijayawada, Andhra Pradesh, India — CYBERSURAKSHA </p>
      </footer>
    </div>
  );
};

export default ConfirmationPage;
