import { TOKEN_LENGTH } from '../config/constants';

/**
 * Generate a random 7-character alphanumeric token with category prefix
 * @param {string} category - The consent category ('digital-arrest', 'investment-fraud', 'other-cybercrimes')
 * @returns {string} Token with prefix (D-, I-, or O-) followed by 7 characters
 */
export const generateToken = (category = 'digital-arrest') => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';
  
  for (let i = 0; i < TOKEN_LENGTH; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }
  
  // Add category prefix
  const prefix = getCategoryPrefix(category);
  return `${prefix}${token}`;
};

/**
 * Get token prefix for category
 * @param {string} category - The consent category
 * @returns {string} The prefix (D-, I-, or O-)
 */
export const getCategoryPrefix = (category) => {
  const prefixes = {
    'digital-arrest': 'D-',
    'investment-fraud': 'I-',
    'other-cybercrimes': 'O-'
  };
  return prefixes[category] || 'D-';
};

/**
 * Extract category from token prefix
 * @param {string} token - The token with prefix
 * @returns {string} The category
 */
export const getCategoryFromToken = (token) => {
  if (!token) return 'digital-arrest';
  
  const prefix = token.substring(0, 2);
  const categories = {
    'D-': 'digital-arrest',
    'I-': 'investment-fraud',
    'O-': 'other-cybercrimes'
  };
  
  return categories[prefix] || 'digital-arrest';
};

/**
 * Format date to readable string
 */
export const formatDate = (date) => {
  const dateObj = new Date(date);
  
  return dateObj.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
};

/**
 * Format date to Telugu readable string
 */
export const formatDateTelugu = (date) => {
  const dateObj = new Date(date);
  
  return dateObj.toLocaleString('te-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
};

/**
 * Validate token format
 * Accepts both new format (D-/I-/O-XXXXXXX) and legacy format (XXXXXXX)
 */
export const isValidToken = (token) => {
  if (!token || typeof token !== 'string') {
    return false;
  }
  
  const newTokenRegex = /^[DIO]-[A-Z0-9]{7}$/;
  const legacyTokenRegex = /^[A-Z0-9]{7}$/;
  return newTokenRegex.test(token) || legacyTokenRegex.test(token);
};

/**
 * Validate name
 */
export const isValidName = (name) => {
  if (!name || typeof name !== 'string') {
    return false;
  }
  
  const trimmedName = name.trim();
  return trimmedName.length > 0 && trimmedName.length <= 200;
};

/**
 * Scroll to element smoothly
 */
export const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

/**
 * Detect if user is on iOS device
 */
export const isIOS = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  // Check for iOS devices
  return /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
};

/**
 * Detect if user is on Android device
 */
export const isAndroid = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  // Check for Android devices
  return /android/i.test(userAgent);
};

/**
 * Get device type (ios, android, or desktop)
 */
export const getDeviceType = () => {
  if (isIOS()) return 'ios';
  if (isAndroid()) return 'android';
  return 'desktop';
};
