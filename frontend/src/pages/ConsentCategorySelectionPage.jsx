import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ConsentCategorySelectionPage.css';

/**
 * ConsentCategorySelectionPage Component
 * Allows users to select the type of cybercrime consent form
 */
const ConsentCategorySelectionPage = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const championImages = [
    '/champion/WhatsApp Image 2026-02-23 at 11.02.20.jpeg',
    '/champion/WhatsApp Image 2026-02-23 at 11.02.20 (1).jpeg',
    '/champion/WhatsApp Image 2026-02-23 at 11.02.20 (2).jpeg',
    '/champion/WhatsApp Image 2026-02-23 at 11.02.21 (1).jpeg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % championImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [championImages.length]);

  const handleCategorySelect = (category) => {
    // Store the selected category in sessionStorage
    sessionStorage.setItem('consentCategory', category);
    navigate('/cybersuraksha/consent-form');
  };

  return (
    <div className="consent-category-page">
      <header className="consent-category-page__header">
        <div className="consent-category-page__header-content">
          <div className="consent-category-page__logo">
            <div className="consent-category-page__logo-icon">
              <img src="/ap-police-logo.png" alt="AP Police Logo" />
            </div>
            <div className="consent-category-page__logo-text">
              <div className="consent-category-page__logo-title">NTR Police Commissionerate, Vijayawada</div>
              <div className="consent-category-page__logo-subtitle">CYBERCRIME AWARENESS AND PREVENTION PORTAL</div>
            </div>
          </div>
        </div>
      </header>

      <main className="consent-category-page__main">
        <div className="consent-category-page__container">
          <div className="consent-category-page__header-section">
            <h1 className="consent-category-page__title">Select Consent Category</h1>
            <p className="consent-category-page__subtitle">
              Choose the type of cybercrime awareness consent form you need to complete
            </p>
          </div>

          <div className="consent-category-page__cards">
            <div className="consent-category-page__card" onClick={() => handleCategorySelect('digital-arrest')}>
              <div className="consent-category-page__card-icon">🚨</div>
              <h2 className="consent-category-page__card-title">Digital Arrest</h2>
              <p className="consent-category-page__card-description">
                Awareness form for digital arrest fraud prevention
              </p>
              <button className="consent-category-page__card-button">
                Select
              </button>
            </div>

            <div className="consent-category-page__card" onClick={() => handleCategorySelect('investment-fraud')}>
              <div className="consent-category-page__card-icon">💰</div>
              <h2 className="consent-category-page__card-title">Investment Fraud</h2>
              <p className="consent-category-page__card-description">
                Awareness form for investment fraud prevention
              </p>
              <button className="consent-category-page__card-button">
                Select
              </button>
            </div>

            <div className="consent-category-page__card" onClick={() => handleCategorySelect('other-cybercrimes')}>
              <div className="consent-category-page__card-icon">🔐</div>
              <h2 className="consent-category-page__card-title">Other Cybercrimes</h2>
              <p className="consent-category-page__card-description">
                Awareness form for other cybercrime prevention
              </p>
              <button className="consent-category-page__card-button">
                Select
              </button>
            </div>
          </div>

          {/* Cyber Suraksha Champion Section */}
          <div className="consent-category-page__champion-section">
            <div className="consent-category-page__champion-carousel">
              <div className="consent-category-page__carousel-container">
                {championImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Cyber Suraksha Champion ${index + 1}`}
                    className={`consent-category-page__carousel-image ${
                      index === currentImageIndex ? 'active' : ''
                    }`}
                  />
                ))}
              </div>
              <div className="consent-category-page__carousel-dots">
                {championImages.map((_, index) => (
                  <button
                    key={index}
                    className={`consent-category-page__carousel-dot ${
                      index === currentImageIndex ? 'active' : ''
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="consent-category-page__champion-text">
              <div className="consent-category-page__champion-title">
                🏆 Cyber Suraksha Champion
              </div>
              <div className="consent-category-page__champion-content">
                <p><strong>NTR Police will recognize banks and branches that actively prevent cyber fraud and protect customers from suspicious transactions.</strong></p>
                
                <p>While submitting this survey, you may enter your:</p>
                
                <ul className="consent-category-page__champion-list">
                  <li><strong>Bank Name</strong></li>
                  <li><strong>Branch Name</strong></li>
                </ul>
                
                <p>Your feedback will help us identify and felicitate responsible banks as Cyber Suraksha Champions.</p>
                
                <p className="consent-category-page__champion-tagline">
                  <strong>Together, let us prevent cyber fraud before it happens</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="consent-category-page__footer">
        <div className="consent-category-page__footer-content">
          <p>&copy; 2026 NTR Police Commissionerate. All rights reserved.</p>
          <p>For emergency assistance, dial 100 or cybercrime helpline 1930</p>
        </div>
      </footer>
    </div>
  );
};

export default ConsentCategorySelectionPage;
