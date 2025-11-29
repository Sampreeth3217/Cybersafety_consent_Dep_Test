import { TOKEN_LENGTH } from '../config/constants';

/**
 * Generate a random 7-character alphanumeric token
 */
export const generateToken = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';
  
  for (let i = 0; i < TOKEN_LENGTH; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }
  
  return token;
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
 */
export const isValidToken = (token) => {
  if (!token || typeof token !== 'string') {
    return false;
  }
  
  const tokenRegex = /^[A-Z0-9]{7}$/;
  return tokenRegex.test(token);
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
