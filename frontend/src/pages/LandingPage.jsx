import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from '../components/LanguageSelector';
import NameInputForm from '../components/NameInputForm';
import { LANGUAGES, ROUTES } from '../config/constants';
import { generateToken } from '../utils/helpers';
import './LandingPage.css';

/**
 * LandingPage Component
 * Initial page for language selection and name input
 * For iOS users, only English option is available
 */
const LandingPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [showNameForm, setShowNameForm] = useState(false);
  const navigate = useNavigate();



  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setShowNameForm(true);
  };

  const handleNameSubmit = (name) => {
    // Generate unique token
    const token = generateToken();

    // Store data in sessionStorage
    sessionStorage.setItem('consentData', JSON.stringify({
      name,
      language: selectedLanguage,
      token,
      currentStatementIndex: 0
    }));

    // Navigate to consent flow
    navigate(ROUTES.CONSENT_FLOW);
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
    <div className="landing-page">
      <header className="landing-page__header-bar">
        <div className="landing-page__header-content">
          <div className="landing-page__logo">
            <div className="landing-page__logo-icon">
              <img src="/CyberSurakshaLogo.png" alt="AP Police Logo" />
            </div>
            <div className="landing-page__logo-text">
              <div className="landing-page__logo-title">Cybercrime Department, NTR</div>
              <div className="confirmation-page__logo-subtitle">CYBERSURAKSHA - CUSTOMER CYBERSAFETY VERIFICATION SYSTEM</div>
            </div>
          </div>
        </div>
      </header>

      <div className="landing-page__main">
        <div className="landing-page__container">
          {!showNameForm ? (
            <>
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
              />
              <div className="landing-page__info-section">
                <div className="landing-page__features-grid">
                  {text.features.map((feature, index) => (
                    <div key={index} className="landing-page__info-item" style={{ animationDelay: `${index * 0.1}s` }}>
                      <span className="landing-page__info-icon">{feature.icon}</span>
                      <span className="landing-page__info-text">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="landing-page__name-form">
              <button
                className="landing-page__back-button"
                onClick={() => setShowNameForm(false)}
              >
                ← {selectedLanguage === 'en' ? 'Back' : 'వెనుకకు'}
              </button>
              <NameInputForm
                language={selectedLanguage}
                onSubmit={handleNameSubmit}
              />
            </div>
          )}
        </div>
      </div>
      <footer className="landing-page__footer">
        <p>© 2025 NTR Police Commissionerate, Vijayawada, Andhra Pradesh, India — CYBERSURAKSHA </p>
      </footer>
    </div>
    //NSC
  );
};

export default LandingPage;
