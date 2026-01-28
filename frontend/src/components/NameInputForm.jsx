import React, { useState } from 'react';
import { isValidName } from '../utils/helpers';
import './NameInputForm.css';

/**
 * NameInputForm Component
 * Collects user's name and mobile number before starting the consent flow
 */
const NameInputForm = ({ language, onSubmit, loading }) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');

  const labels = {
    en: {
      title: 'Enter Your Details',
      namePlaceholder: 'Your full name',
      mobilePlaceholder: 'Mobile number (10 digits)',
      button: 'Start',
      errorNameEmpty: 'Please enter your name',
      errorNameInvalid: 'Please enter a valid name (max 200 characters)',
      errorMobileEmpty: 'Please enter your mobile number',
      errorMobileInvalid: 'Please enter a valid 10-digit mobile number'
    },
    te: {
      title: 'మీ వివరాలను నమోదు చేయండి',
      namePlaceholder: 'మీ పూర్తి పేరు',
      mobilePlaceholder: 'మొబైల్ నంబర్ (10 అంకెలు)',
      button: 'ప్రారంభించండి',
      errorNameEmpty: 'దయచేసి మీ పేరు నమోదు చేయండి',
      errorNameInvalid: 'దయచేసి చెల్లుబాటు అయ్యే పేరును నమోదు చేయండి (గరిష్టంగా 200 అక్షరాలు)',
      errorMobileEmpty: 'దయచేసి మీ మొబైల్ నంబర్‌ను నమోదు చేయండి',
      errorMobileInvalid: 'దయచేసి చెల్లుబాటు అయ్యే 10 అంకెల మొబైల్ నంబర్‌ను నమోదు చేయండి'
    }
  };

  const text = labels[language] || labels.en;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError(text.errorNameEmpty);
      return;
    }

    if (!isValidName(name)) {
      setError(text.errorNameInvalid);
      return;
    }

    if (!mobileNumber.trim()) {
      setError(text.errorMobileEmpty);
      return;
    }

    // Validate Indian mobile number (10 digits, starts with 6-9)
    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      setError(text.errorMobileInvalid);
      return;
    }

    onSubmit(name.trim(), mobileNumber.trim());
  };

  return (
    <form className="name-input-form" onSubmit={handleSubmit}>
      <h2 className="name-input-form__title">{text.title}</h2>
      <div className="name-input-form__field">
        <input
          type="text"
          className="name-input-form__input"
          placeholder={text.namePlaceholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={200}
          autoFocus
          disabled={loading}
        />
      </div>
      <div className="name-input-form__field">
        <input
          type="tel"
          className="name-input-form__input"
          placeholder={text.mobilePlaceholder}
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
          maxLength={10}
          pattern="[6-9][0-9]{9}"
          disabled={loading}
        />
      </div>
      {error && <p className="name-input-form__error">{error}</p>}
      <button type="submit" className="name-input-form__button" disabled={loading}>
        {loading ? (language === 'en' ? 'Checking...' : 'తనిఖీ చేస్తోంది...') : text.button}
      </button>
    </form>
  );
};

export default NameInputForm;
