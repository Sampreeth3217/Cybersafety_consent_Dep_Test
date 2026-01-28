import React from 'react';
import './SpeechStatusIndicator.css';

/**
 * SpeechStatusIndicator Component
 * Shows visual feedback for speech recognition status
 */
const SpeechStatusIndicator = ({ isListening, transcript, validationResult, language }) => {
  const labels = {
    en: {
      listening: 'Listening...',
      processing: 'Processing...',
      success: 'Verified!',
      tryAgain: 'Please try again'
    },
    te: {
      listening: 'వింటోంది...',
      processing: 'ప్రాసెస్ చేస్తోంది...',
      success: 'ధృవీకరించబడింది!',
      tryAgain: 'దయచేసి మళ్ళీ ప్రయత్నించండి'
    }
  };

  const text = labels[language] || labels.en;

  if (isListening) {
    return (
      <div className="speech-status speech-status--listening">
        <div className="speech-status__icon speech-status__icon--pulse">
          🎤
        </div>
        <p className="speech-status__text">{text.listening}</p>
        <div className="speech-status__waveform">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  if (transcript && !validationResult) {
    return (
      <div className="speech-status speech-status--processing">
        <div className="speech-status__icon speech-status__icon--spin">
          ⚙️
        </div>
        <p className="speech-status__text">{text.processing}</p>
      </div>
    );
  }

  if (validationResult) {
    if (validationResult.isValid) {
      return (
        <div className="speech-status speech-status--success">
          <div className="speech-status__icon speech-status__icon--bounce">
            ✓
          </div>
          <p className="speech-status__text">{text.success}</p>
          <p className="speech-status__similarity">
            {language === 'en' ? 'Match:' : 'సరిపోలిక:'} {validationResult.similarity}%
          </p>
        </div>
      );
    } else {
      return (
        <div className="speech-status speech-status--error">
          <div className="speech-status__icon">
            ✗
          </div>
          <p className="speech-status__text">{text.tryAgain}</p>
          <p className="speech-status__similarity">
            {language === 'en' ? 'Match:' : 'సరిపోలిక:'} {validationResult.similarity}%
          </p>
        </div>
      );
    }
  }

  return null;
};

export default SpeechStatusIndicator;
