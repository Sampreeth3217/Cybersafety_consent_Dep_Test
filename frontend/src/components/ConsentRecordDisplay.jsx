import React from 'react';
import { formatDate } from '../utils/helpers';
import './ConsentRecordDisplay.css';

/**
 * ConsentRecordDisplay Component
 * Displays consent record details for manager
 */
const ConsentRecordDisplay = ({ record, onClose }) => {
  if (!record) {
    return null;
  }

  return (
    <div className="consent-record-display">
      <div className="consent-record-display__header">
        <h3 className="consent-record-display__title">Consent Record Found</h3>
        <button
          className="consent-record-display__close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div className="consent-record-display__content">
        <div className="consent-record-display__field">
          <label className="consent-record-display__label">Token</label>
          <p className="consent-record-display__value consent-record-display__value--token">
            {record.token}
          </p>
        </div>

        <div className="consent-record-display__field">
          <label className="consent-record-display__label">Customer Name</label>
          <p className="consent-record-display__value">
            {record.name}
          </p>
        </div>

        <div className="consent-record-display__field">
          <label className="consent-record-display__label">Language</label>
          <p className="consent-record-display__value">
            {record.language}
          </p>
        </div>

        <div className="consent-record-display__field">
          <label className="consent-record-display__label">Created At</label>
          <p className="consent-record-display__value">
            {formatDate(record.createdAt)}
          </p>
        </div>
      </div>

      <div className="consent-record-display__status">
        <span className="consent-record-display__badge">
          ✓ Verified
        </span>
      </div>
    </div>
  );
};

/**
 * NoRecordFound Component
 * Displays when no record is found
 */
export const NoRecordFound = ({ token, onClose }) => {
  return (
    <div className="consent-record-display consent-record-display--not-found">
      <div className="consent-record-display__header">
        <h3 className="consent-record-display__title">No Record Found</h3>
        <button
          className="consent-record-display__close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div className="consent-record-display__content">
        <div className="consent-record-display__icon">
          ⚠️
        </div>
        <p className="consent-record-display__message">
          No consent record found for token: <strong>{token}</strong>
        </p>
        <p className="consent-record-display__submessage">
          Please verify the token and try again.
        </p>
      </div>
    </div>
  );
};

export default ConsentRecordDisplay;
