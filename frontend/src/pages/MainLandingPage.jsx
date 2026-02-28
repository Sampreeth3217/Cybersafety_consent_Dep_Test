import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/constants';
import AIChatbot from '../components/AIChatbot';
import './MainLandingPage.css';

/**
 * MainLandingPage Component
 * Main entry point showing available applications as cards
 */
const MainLandingPage = () => {
  const navigate = useNavigate();



  const handleProjectClick = (route) => {
    navigate(route);
  };

  const handleCategoryClick = (category) => {
    navigate(`/cybercrime/${category}`);
  };

  const handleExternalLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="main-landing-page">
      <header className="main-landing-page__header-bar">
        <div className="main-landing-page__header-content">
          <div className="main-landing-page__logo">
            <div className="main-landing-page__logo-icon">
              <img src="/ap-police-logo.png" alt="AP Police Logo" />
            </div>
            <div className="main-landing-page__logo-text">
              <div className="main-landing-page__logo-title">NTR Police Commissionerate, Vijayawada, Andhra Pradesh, India</div>
              <div className="main-landing-page__logo-subtitle">CYBERCRIME AWARENESS AND PREVENTION PORTAL</div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner Section */}
      <div className="main-landing-page__hero-banner">
        <div className="main-landing-page__hero-content">
          <img 
            src="/Hero_Section.jpg" 
            alt="Digital Security Hero Banner"
            className="main-landing-page__hero-image"
          />
        </div>
      </div>

      {/* Action Cards Section */}
      <div className="main-landing-page__actions">
        <div className="main-landing-page__actions-container">
          <div className="main-landing-page__action-card">
            <div className="main-landing-page__card-image main-landing-page__card-image--cybersuraksha" onClick={() => handleProjectClick(ROUTES.CYBERSAFETY_CONSENT)}>
              <img src="/CyberSurakshaLogo.png" alt="CyberSuraksha Logo" />
            </div>
            <button 
              className="main-landing-page__card-button"
              onClick={() => handleProjectClick(ROUTES.CYBERSAFETY_CONSENT)}
            >
              Forms for Citizens
            </button>
          </div>
          
          <div className="main-landing-page__action-card">
            <div className="main-landing-page__card-image" onClick={() => window.open('https://cybercrime.gov.in/', '_blank')}>
              <div className="main-landing-page__card-icon">📝</div>
            </div>
            <button 
              className="main-landing-page__card-button"
              onClick={() => window.open('https://cybercrime.gov.in/', '_blank')}
            >
              Report a Cybercrime
            </button>
          </div>
          
          <div className="main-landing-page__action-card">
            <div className="main-landing-page__card-image main-landing-page__card-image--sebi" onClick={() => window.open('https://siportal.sebi.gov.in/intermediary/sebi-check', '_blank')}>
              <img src="/sebi.png" alt="SEBI Logo" />
            </div>
            <button 
              className="main-landing-page__card-button"
              onClick={() => window.open('https://siportal.sebi.gov.in/intermediary/sebi-check', '_blank')}
            >
              Validate Your Investment Broker's UPI & Bank Details with SEBI Check Here
            </button>
          </div>
          
          <div className="main-landing-page__action-card">
            <div className="main-landing-page__card-image main-landing-page__card-image--sebi" onClick={() => window.open('https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=30', '_blank')}>
              <img src="/sebi.png" alt="SEBI Logo" />
            </div>
            <button 
              className="main-landing-page__card-button"
              onClick={() => window.open('https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=30', '_blank')}
            >
              Avoid Investment Fraud – Verify Your Broker with SEBI Here
            </button>
          </div>
        </div>
      </div>

      {/* Safe Practices Section */}
      <div className="main-landing-page__safe-practices">
        <div className="main-landing-page__safe-practices-container">
          <div className="main-landing-page__practices-content">
            <h2 className="main-landing-page__practices-title">Safe Practices to prevent Cybercrime</h2>
            
            <div className="main-landing-page__practices-list">
              <div className="main-landing-page__practice-item">
                <div className="main-landing-page__practice-number">1</div>
                <div className="main-landing-page__practice-text">Never respond to the unknown <strong>Calls/messages/video calls/Internet Calls/emails</strong>.</div>
              </div>
              
              <div className="main-landing-page__practice-item">
                <div className="main-landing-page__practice-number">2</div>
                <div className="main-landing-page__practice-text">Never share your personal details like <strong>OTPs/Aadhar/PAN/Credit and Debit card's/ Bank account</strong>.</div>
              </div>
              
              <div className="main-landing-page__practice-item">
                <div className="main-landing-page__practice-number">3</div>
                <div className="main-landing-page__practice-text">Never click on <strong>fake links received from unknown numbers</strong>.</div>
              </div>
              
              <div className="main-landing-page__practice-item">
                <div className="main-landing-page__practice-number">4</div>
                <div className="main-landing-page__practice-text">Never do bank transactions in the <strong>unofficial apps/websites/links</strong>.</div>
              </div>
              
              <div className="main-landing-page__practice-item">
                <div className="main-landing-page__practice-number">5</div>
                <div className="main-landing-page__practice-text">Never accept the <strong>social media requests from unknown persons</strong>.</div>
              </div>
              
              <div className="main-landing-page__practice-item">
                <div className="main-landing-page__practice-number">6</div>
                <div className="main-landing-page__practice-text">Never trust on <strong>unregistered investment platforms offering low investment – promising high returns</strong>.</div>
              </div>
            </div>
          </div>
          
          <div className="main-landing-page__practices-sidebar">
            <div className="main-landing-page__practices-illustration">
              <img src="/CompoundLogo.png" alt="Compound Logo" />
            </div>
            <div className="main-landing-page__emergency-info">
              <h3 className="main-landing-page__emergency-title">In case of Cyber Frauds call</h3>
              <div className="main-landing-page__emergency-number">1930</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cybercrime Categories Section */}
      <div className="main-landing-page__categories">
        <div className="main-landing-page__categories-container">
          <div className="main-landing-page__categories-header">
            <h2 className="main-landing-page__categories-title">CYBERCRIME CATEGORIES</h2>
          </div>
          
          <div className="main-landing-page__categories-grid">
            <div className="main-landing-page__category-card" onClick={() => navigate('/cybercrime/cryptocurrency')}>
              <div className="main-landing-page__category-content">
                <h3 className="main-landing-page__category-title">CRYPTOCURRENCY CRIME</h3>
                <p className="main-landing-page__category-subtitle">VIEW DETAIL</p>
              </div>
            </div>
            
            <div className="main-landing-page__category-card" onClick={() => navigate('/cybercrime/cyber-terrorism')}>
              <div className="main-landing-page__category-content">
                <h3 className="main-landing-page__category-title">CYBER TERRORISM</h3>
                <p className="main-landing-page__category-subtitle">VIEW DETAIL</p>
              </div>
            </div>
            
            <div className="main-landing-page__category-card" onClick={() => navigate('/cybercrime/hacking')}>
              <div className="main-landing-page__category-content">
                <h3 className="main-landing-page__category-title">HACKING / DAMAGE TO COMPUTER SYSTEM (S)</h3>
                <p className="main-landing-page__category-subtitle">VIEW DETAIL</p>
              </div>
            </div>
            
            <div className="main-landing-page__category-card" onClick={() => navigate('/cybercrime/social-media')}>
              <div className="main-landing-page__category-content">
                <h3 className="main-landing-page__category-title">ONLINE AND SOCIAL MEDIA RELATED CRIME</h3>
                <p className="main-landing-page__category-subtitle">VIEW DETAIL</p>
              </div>
            </div>
            
            <div className="main-landing-page__category-card" onClick={() => navigate('/cybercrime/financial-fraud')}>
              <div className="main-landing-page__category-content">
                <h3 className="main-landing-page__category-title">ONLINE FINANCIAL FRAUD</h3>
                <p className="main-landing-page__category-subtitle">VIEW DETAIL</p>
              </div>
            </div>
            
            <div className="main-landing-page__category-card" onClick={() => navigate('/cybercrime/explicit-material')}>
              <div className="main-landing-page__category-content">
                <h3 className="main-landing-page__category-title">PUBLISHING / TRANSMITTING OF EXPLICIT MATERIAL IN ELECTRONIC FORM</h3>
                <p className="main-landing-page__category-subtitle">VIEW DETAIL</p>
              </div>
            </div>
            
            <div className="main-landing-page__category-card" onClick={() => navigate('/cybercrime/ransomware')}>
              <div className="main-landing-page__category-content">
                <h3 className="main-landing-page__category-title">RANSOMWARE</h3>
                <p className="main-landing-page__category-subtitle">VIEW DETAIL</p>
              </div>
            </div>
            
            <div className="main-landing-page__category-card" onClick={() => navigate('/cybercrime/child-abuse')}>
              <div className="main-landing-page__category-content">
                <h3 className="main-landing-page__category-title">CHILD PORNOGRAPHY / CHILD SEXUAL ABUSE MATERIAL (CSAM)</h3>
                <p className="main-landing-page__category-subtitle">VIEW DETAIL</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="main-landing-page__footer">
        <p>© 2025 NTR Police Commissionerate, Vijayawada, Andhra Pradesh, India — CYBERCRIME AWARENESS AND PREVENTION PORTAL</p>
      </footer>
      
      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default MainLandingPage;