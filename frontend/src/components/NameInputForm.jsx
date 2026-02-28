import React, { useState } from 'react';
import { isValidName } from '../utils/helpers';
import { bankNames, branches } from '../config/bankData';
import './NameInputForm.css';

/**
 * NameInputForm Component
 * Collects user's name and mobile number before starting the consent flow
 */
const NameInputForm = ({ language, onSubmit, loading }) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankBranch, setBankBranch] = useState('');
  const [customBankName, setCustomBankName] = useState('');
  const [customBankBranch, setCustomBankBranch] = useState('');
  const [isOtherBank, setIsOtherBank] = useState(false);
  const [isOtherBranch, setIsOtherBranch] = useState(false);
  const [error, setError] = useState('');

  const labels = {
    en: {
      title: 'Enter Your Details',
      namePlaceholder: 'Your full name',
      mobilePlaceholder: 'Mobile number (10 digits)',
      bankNameLabel: 'Select Bank Name',
      bankNamePlaceholder: 'Select your bank (optional)',
      bankBranchLabel: 'Select Branch',
      bankBranchPlaceholder: 'Select your branch (optional)',
      customBankNameLabel: 'Enter Bank Name',
      customBankNamePlaceholder: 'Enter your bank name',
      customBankBranchLabel: 'Enter Branch',
      customBankBranchPlaceholder: 'Enter your branch name',
      customBranchOnlyLabel: 'Enter Branch Name',
      customBranchOnlyPlaceholder: 'Enter your branch name',
      otherOption: 'Other',
      button: 'Start',
      errorNameEmpty: 'Please enter your name',
      errorNameInvalid: 'Please enter a valid name (max 200 characters)',
      errorMobileEmpty: 'Please enter your mobile number',
      errorMobileInvalid: 'Please enter a valid 10-digit mobile number',
      errorBankNameEmpty: 'Please select your bank name',
      errorBankBranchEmpty: 'Please select your branch',
      errorCustomBankNameEmpty: 'Please enter your bank name',
      errorCustomBankBranchEmpty: 'Please enter your branch name'
    },
    te: {
      title: 'మీ వివరాలను నమోదు చేయండి',
      namePlaceholder: 'మీ పూర్తి పేరు',
      mobilePlaceholder: 'మొబైల్ నంబర్ (10 అంకెలు)',
      bankNameLabel: 'బ్యాంకు పేరు ఎంచుకోండి',
      bankNamePlaceholder: 'మీ బ్యాంకును ఎంచుకోండి (ఐచ్ఛికం)',
      bankBranchLabel: 'శాఖను ఎంచుకోండి',
      bankBranchPlaceholder: 'మీ శాఖను ఎంచుకోండి (ఐచ్ఛికం)',
      customBankNameLabel: 'బ్యాంకు పేరు నమోదు చేయండి',
      customBankNamePlaceholder: 'మీ బ్యాంకు పేరును నమోదు చేయండి',
      customBankBranchLabel: 'శాఖ నమోదు చేయండి',
      customBankBranchPlaceholder: 'మీ శాఖ పేరును నమోదు చేయండి',
      customBranchOnlyLabel: 'శాఖ పేరు నమోదు చేయండి',
      customBranchOnlyPlaceholder: 'మీ శాఖ పేరును నమోదు చేయండి',
      otherOption: 'ఇతర',
      button: 'ప్రారంభించండి',
      errorNameEmpty: 'దయచేసి మీ పేరు నమోదు చేయండి',
      errorNameInvalid: 'దయచేసి చెల్లుబాటు అయ్యే పేరును నమోదు చేయండి (గరిష్టంగా 200 అక్షరాలు)',
      errorMobileEmpty: 'దయచేసి మీ మొబైల్ నంబర్‌ను నమోదు చేయండి',
      errorMobileInvalid: 'దయచేసి చెల్లుబాటు అయ్యే 10 అంకెల మొబైల్ నంబర్‌ను నమోదు చేయండి',
      errorBankNameEmpty: 'దయచేసి మీ బ్యాంకు పేరును ఎంచుకోండి',
      errorBankBranchEmpty: 'దయచేసి మీ శాఖను ఎంచుకోండి',
      errorCustomBankNameEmpty: 'దయచేసి మీ బ్యాంకు పేరును నమోదు చేయండి',
      errorCustomBankBranchEmpty: 'దయచేసి మీ శాఖ పేరును నమోదు చేయండి'
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

    // Get bank and branch values (optional)
    let finalBankName = '';
    let finalBankBranch = '';

    if (isOtherBank) {
      finalBankName = customBankName.trim();
      finalBankBranch = customBankBranch.trim();
    } else {
      finalBankName = bankName.trim();
      finalBankBranch = bankBranch.trim();
    }

    onSubmit(name.trim(), mobileNumber.trim(), finalBankName, finalBankBranch);
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
      <div className="name-input-form__field">
        <label className="name-input-form__label">{text.bankNameLabel}</label>
        <select
          className="name-input-form__select"
          value={isOtherBank ? 'OTHER' : bankName}
          onChange={(e) => {
            const value = e.target.value;
            if (value === 'OTHER') {
              setIsOtherBank(true);
              setBankName('');
              setBankBranch('');
              setIsOtherBranch(false);
            } else {
              setIsOtherBank(false);
              setBankName(value);
              setCustomBankName('');
              setCustomBankBranch('');
            }
          }}
          disabled={loading}
        >
          <option value="">{text.bankNamePlaceholder}</option>
          {bankNames.map((bank) => (
            <option key={bank} value={bank}>
              {bank}
            </option>
          ))}
          <option value="OTHER">{text.otherOption}</option>
        </select>
      </div>
      
      {isOtherBank ? (
        <>
          <div className="name-input-form__field">
            <label className="name-input-form__label">{text.customBankNameLabel}</label>
            <input
              type="text"
              className="name-input-form__input"
              placeholder={text.customBankNamePlaceholder}
              value={customBankName}
              onChange={(e) => setCustomBankName(e.target.value)}
              maxLength={200}
              disabled={loading}
            />
          </div>
          <div className="name-input-form__field">
            <label className="name-input-form__label">{text.customBankBranchLabel}</label>
            <input
              type="text"
              className="name-input-form__input"
              placeholder={text.customBankBranchPlaceholder}
              value={customBankBranch}
              onChange={(e) => setCustomBankBranch(e.target.value)}
              maxLength={200}
              disabled={loading}
            />
          </div>
        </>
      ) : (
        <>
          <div className="name-input-form__field">
            <label className="name-input-form__label">{text.bankBranchLabel}</label>
            <select
              className="name-input-form__select"
              value={isOtherBranch ? 'OTHER' : bankBranch}
              onChange={(e) => {
                const value = e.target.value;
                if (value === 'OTHER') {
                  setIsOtherBranch(true);
                  setBankBranch('');
                } else {
                  setIsOtherBranch(false);
                  setBankBranch(value);
                }
              }}
              disabled={loading}
            >
              <option value="">{text.bankBranchPlaceholder}</option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
              <option value="OTHER">{text.otherOption}</option>
            </select>
          </div>
          {isOtherBranch && (
            <div className="name-input-form__field">
              <label className="name-input-form__label">{text.customBranchOnlyLabel}</label>
              <input
                type="text"
                className="name-input-form__input"
                placeholder={text.customBranchOnlyPlaceholder}
                value={bankBranch}
                onChange={(e) => setBankBranch(e.target.value)}
                maxLength={200}
                disabled={loading}
              />
            </div>
          )}
        </>
      )}
      {error && <p className="name-input-form__error">{error}</p>}
      <button type="submit" className="name-input-form__button" disabled={loading}>
        {loading ? (language === 'en' ? 'Checking...' : 'తనిఖీ చేస్తోంది...') : text.button}
      </button>
    </form>
  );
};

export default NameInputForm;
