import React from 'react';
import { LANGUAGES, LANGUAGE_NAMES } from '../config/constants';
import './LanguageSelector.css';

/**
 * LanguageSelector Component
 * Allows users to select between English and Telugu
 */
const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <div className="language-selector">
      <div className="language-selector__header">
        <h2 className="language-selector__title">Select Your Language</h2>
        <p className="language-selector__subtitle">Please select your preferred language</p>
      </div>
      <div className="language-selector__options">
        <button
          className={`language-selector__button ${
            selectedLanguage === LANGUAGES.EN ? 'language-selector__button--active' : ''
          }`}
          onClick={() => onLanguageChange(LANGUAGES.EN)}
          aria-label="Select English"
        >
          <span className="language-selector__text">English</span>
          {selectedLanguage === LANGUAGES.EN && (
            <span className="language-selector__checkmark">✓</span>
          )}
        </button>
        <button
          className={`language-selector__button ${
            selectedLanguage === LANGUAGES.TE ? 'language-selector__button--active' : ''
          }`}
          onClick={() => onLanguageChange(LANGUAGES.TE)}
          aria-label="Select Telugu"
        >
          <span className="language-selector__text">తెలుగు</span>
          {selectedLanguage === LANGUAGES.TE && (
            <span className="language-selector__checkmark">✓</span>
          )}
        </button>
      </div>
      {selectedLanguage && (
        <div className="language-selector__confirmation">
          <span className="language-selector__confirmation-icon">✓</span>
          <span className="language-selector__confirmation-text">
            {selectedLanguage === LANGUAGES.EN ? 'English language selected' : 'తెలుగు భాష ఎంచుకున్నారు'}
          </span>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
