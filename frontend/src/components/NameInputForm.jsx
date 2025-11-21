import React, { useState } from 'react';
import { isValidName } from '../utils/helpers';
import './NameInputForm.css';

/**
 * NameInputForm Component
 * Collects user's name before starting the consent flow
 */
const NameInputForm = ({ language, onSubmit }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const labels = {
    en: {
      title: 'Enter Your Name',
      placeholder: 'Your full name',
      button: 'Start',
      errorEmpty: 'Please enter your name',
      errorInvalid: 'Please enter a valid name (max 200 characters)'
    },
    te: {
      title: 'మీ పేరు నమోదు చేయండి',
      placeholder: 'మీ పూర్తి పేరు',
      button: 'ప్రారంభించండి',
      errorEmpty: 'దయచేసి మీ పేరు నమోదు చేయండి',
      errorInvalid: 'దయచేసి చెల్లుబాటు అయ్యే పేరును నమోదు చేయండి (గరిష్టంగా 200 అక్షరాలు)'
    }
  };

  const text = labels[language] || labels.en;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError(text.errorEmpty);
      return;
    }

    if (!isValidName(name)) {
      setError(text.errorInvalid);
      return;
    }

    onSubmit(name.trim());
  };

  return (
    <form className="name-input-form" onSubmit={handleSubmit}>
      <h2 className="name-input-form__title">{text.title}</h2>
      <div className="name-input-form__field">
        <input
          type="text"
          className="name-input-form__input"
          placeholder={text.placeholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={200}
          autoFocus
        />
        {error && <p className="name-input-form__error">{error}</p>}
      </div>
      <button type="submit" className="name-input-form__button">
        {text.button}
      </button>
    </form>
  );
};

export default NameInputForm;
