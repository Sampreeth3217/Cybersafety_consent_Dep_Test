import jwt from 'jsonwebtoken';

/**
 * Police credentials
 */
const POLICE_CREDENTIALS = {
  username: 'NTRPOLICE',
  password: '1@3$PoliceNTR'
};

/**
 * JWT Secret for police authentication
 */
const POLICE_JWT_SECRET = process.env.POLICE_JWT_SECRET || 'cybersuraksha-police-secret-2024';

/**
 * Token expiration: 8 hours
 */
const TOKEN_EXPIRATION = '8h';

/**
 * Generate JWT token for police
 */
const generatePoliceToken = (username) => {
  return jwt.sign(
    { username, type: 'police' },
    POLICE_JWT_SECRET,
    { expiresIn: TOKEN_EXPIRATION }
  );
};

/**
 * Verify police JWT token
 */
const verifyPoliceToken = (token) => {
  try {
    return jwt.verify(token, POLICE_JWT_SECRET);
  } catch (error) {
    return null;
  }
};

/**
 * Middleware to authenticate police requests
 */
const authenticatePolice = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No authentication token provided'
      });
    }

    const token = authHeader.substring(7);
    const decoded = verifyPoliceToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    req.police = {
      username: decoded.username
    };

    next();
  } catch (error) {
    console.error('Police authentication error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication error'
    });
  }
};

/**
 * Validate police credentials
 */
const validatePoliceCredentials = (username, password) => {
  return username === POLICE_CREDENTIALS.username && 
         password === POLICE_CREDENTIALS.password;
};

export {
  generatePoliceToken,
  verifyPoliceToken,
  authenticatePolice,
  validatePoliceCredentials,
  POLICE_JWT_SECRET
};
