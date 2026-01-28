/**
 * Validate token format (7 alphanumeric characters)
 */
export const validateToken = (token) => {
  if (!token || typeof token !== 'string') {
    return false;
  }
  
  const tokenRegex = /^[A-Z0-9]{7}$/;
  return tokenRegex.test(token);
};

/**
 * Validate name input
 */
export const validateName = (name) => {
  if (!name || typeof name !== 'string') {
    return false;
  }
  
  const trimmedName = name.trim();
  return trimmedName.length > 0 && trimmedName.length <= 200;
};

/**
 * Validate language code
 */
export const validateLanguage = (language) => {
  return language === 'en' || language === 'te';
};

/**
 * Sanitize input by trimming and limiting length
 */
export const sanitizeInput = (input, maxLength = 200) => {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input.trim().substring(0, maxLength);
};
