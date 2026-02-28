import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from '../components/LanguageSelector';
import NameInputForm from '../components/NameInputForm';
import { LANGUAGES, ROUTES } from '../config/constants';
import { generateToken } from '../utils/helpers';
import { getCategoryName } from '../config/statements';
import './CybersafetyConsentPage.css';

/**
 * CybersafetyConsentPage Component
 * Language selection and name input page for cybersafety consent flow
 * For iOS users, only English option is available
 */
const CybersafetyConsentPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [showNameForm, setShowNameForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('digital-arrest');
  const navigate = useNavigate();

  useEffect(() => {
    // Get category from sessionStorage
    const storedCategory = sessionStorage.getItem('consentCategory');
    if (storedCategory) {
      setCategory(storedCategory);
    } else {
      // If no category selected, redirect to category selection
      navigate(ROUTES.CYBERSAFETY_CONSENT);
    }
  }, [navigate]);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setShowNameForm(true);
  };

  const handleNameSubmit = async (name, mobileNumber, bankName, bankBranch) => {
    console.log('CybersafetyConsentPage handleNameSubmit called with:', { name, mobileNumber, bankName, bankBranch, category });
    setLoading(true);
    
    try {
      // Check if mobile number already has a consent record for this category
      const checkResponse = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/consent/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mobileNumber, category })
      });

      const checkData = await checkResponse.json();

      if (checkData.success && checkData.exists) {
        // Verify the token prefix matches the current category
        const token = checkData.data.token;
        const categoryPrefixes = {
          'digital-arrest': 'D-',
          'investment-fraud': 'I-',
          'other-cybercrimes': 'O-'
        };
        
        const expectedPrefix = categoryPrefixes[category];
        const hasCorrectPrefix = token && token.startsWith(expectedPrefix);
        
        // Only treat as existing if token has the correct prefix for this category
        if (hasCorrectPrefix) {
          // Navigate to confirmation page with existing token data
          sessionStorage.setItem('consentData', JSON.stringify({
            name: checkData.data.name,
            mobileNumber,
            bankName: checkData.data.bankName || bankName,
            bankBranch: checkData.data.bankBranch || bankBranch,
            language: selectedLanguage,
            token: checkData.data.token,
            category: category,
            isExisting: true
          }));
          navigate(ROUTES.CONFIRMATION);
          return;
        }
        // If prefix doesn't match, proceed to create new consent for this category
      }

      // Generate unique token with category prefix
      const token = generateToken(category);
      
      console.log('Generated token:', token, 'for category:', category);

      // Store data in sessionStorage
      const dataToStore = {
        name,
        mobileNumber,
        bankName,
        bankBranch,
        language: selectedLanguage,
        token,
        category,
        currentStatementIndex: 0
      };
      
      console.log('Storing consent data:', dataToStore);
      sessionStorage.setItem('consentData', JSON.stringify(dataToStore));

      // Navigate to consent flow
      navigate(ROUTES.CONSENT_FLOW);
    } catch (error) {
      console.error('Error checking mobile number:', error);
      const errorMessages = {
        en: 'Error checking mobile number. Please try again.',
        te: 'మొబైల్ నంబర్ తనిఖీ చేయడంలో లోపం. దయచేసి మళ్లీ ప్రయత్నించండి.'
      };
      alert(errorMessages[selectedLanguage] || errorMessages.en);
      setLoading(false);
    }
  };

  const content = {
    en: {
      title: 'Bank Transaction Safety Consent',
      subtitle: 'Please read and confirm cybercrime awareness statements',
      tagline: 'Your Security, Our Priority',
      description: 'Before proceeding with your bank transaction, you need to read and verbally confirm a series of cybersafety statements. This is to ensure your awareness and protection against cyber fraud.',
      features: [
        { icon: '🎤', text: 'Read statements clearly using your microphone' },
        { icon: '✓', text: 'Each statement must be spoken and verified' },
        { icon: '⏱️', text: 'Takes approximately 3-5 minutes' },
        { icon: '🔒', text: 'Your voice is not recorded' }
      ]
    },
    te: {
      title: 'బ్యాంక్ లావాదేవీ భద్రత సమ్మతి',
      subtitle: 'దయచేసి సైబర్ క్రైమ్ అవగాహన ప్రకటనలను చదివి ధృవీకరించండి',
      tagline: 'మీ భద్రత, మా ప్రాధాన్యత',
      description: 'మీ బ్యాంక్ లావాదేవీని కొనసాగించే ముందు, మీరు సైబర్ భద్రత ప్రకటనల శ్రేణిని చదవాలి మరియు మౌఖికంగా ధృవీకరించాలి. సైబర్ మోసాల నుండి మీ అవగాహన మరియు రక్షణను నిర్ధారించడానికి ఇది అవసరం.',
      features: [
        { icon: '🎤', text: 'మీ మైక్రోఫోన్ ఉపయోగించి ప్రకటనలను స్పష్టంగా చదవండి' },
        { icon: '✓', text: 'ప్రతి ప్రకటన మాట్లాడబడి ధృవీకరించబడాలి' },
        { icon: '⏱️', text: 'సుమారు 3-5 నిమిషాలు పడుతుంది' },
        { icon: '🔒', text: 'మీ స్వరం రికార్డ్ చేయబడదు' }
      ]
    }
  };

  const text = content[selectedLanguage] || content.en;

  return (
    <div className="cybersafety-consent-page">
      <header className="cybersafety-consent-page__header-bar">
        <div className="cybersafety-consent-page__header-content">
          <div className="cybersafety-consent-page__logo">
            <div className="cybersafety-consent-page__logo-icon">
              <img src="/CyberSurakshaLogo.png" alt="AP Police Logo" />
            </div>
            <div className="cybersafety-consent-page__logo-text">
              <div className="cybersafety-consent-page__logo-title">Cybercrime Department, NTR</div>
              <div className="cybersafety-consent-page__logo-subtitle">CUSTOMER CYBERSAFETY VERIFICATION SYSTEM</div>
            </div>
          </div>
        </div>
      </header>

      <div className="cybersafety-consent-page__main">
        <div className="cybersafety-consent-page__container">
          {!showNameForm ? (
            <>
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
              />
              <div className="cybersafety-consent-page__info-section">
                <div className="cybersafety-consent-page__features-grid">
                  {text.features.map((feature, index) => (
                    <div key={index} className="cybersafety-consent-page__info-item" style={{ animationDelay: `${index * 0.1}s` }}>
                      <span className="cybersafety-consent-page__info-icon">{feature.icon}</span>
                      <span className="cybersafety-consent-page__info-text">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="cybersafety-consent-page__name-form">
              <button
                className="cybersafety-consent-page__back-button"
                onClick={() => setShowNameForm(false)}
                disabled={loading}
              >
                ← {selectedLanguage === 'en' ? 'Back' : 'వెనుకకు'}
              </button>
              <NameInputForm
                language={selectedLanguage}
                onSubmit={handleNameSubmit}
                loading={loading}
              />
            </div>
          )}
        </div>
      </div>
      
      <footer className="cybersafety-consent-page__footer">
        <p>© 2025 NTR Police Commissionerate, Vijayawada, Andhra Pradesh, India — CYBERSURAKSHA</p>
      </footer>
    </div>
  );
};

export default CybersafetyConsentPage;