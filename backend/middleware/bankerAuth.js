import jwt from 'jsonwebtoken';

/**
 * JWT Secret for banker authentication
 * In production, this should be in environment variables
 */
const BANKER_JWT_SECRET = process.env.BANKER_JWT_SECRET || 'cybersuraksha-banker-secret-2024';

/**
 * Token expiration: 30 days (1 month)
 */
const TOKEN_EXPIRATION = '30d';

/**
 * Generate JWT token for banker
 */
const generateBankerToken = (ifscCode) => {
  return jwt.sign(
    { ifscCode, type: 'banker' },
    BANKER_JWT_SECRET,
    { expiresIn: TOKEN_EXPIRATION }
  );
};

/**
 * Verify banker JWT token
 */
const verifyBankerToken = (token) => {
  try {
    return jwt.verify(token, BANKER_JWT_SECRET);
  } catch (error) {
    return null;
  }
};

/**
 * Middleware to authenticate banker requests
 */
const authenticateBanker = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No authentication token provided'
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const decoded = verifyBankerToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    // Attach banker info to request
    req.banker = {
      ifscCode: decoded.ifscCode
    };

    next();
  } catch (error) {
    console.error('Banker authentication error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication error'
    });
  }
};

export {
  generateBankerToken,
  verifyBankerToken,
  authenticateBanker,
  BANKER_JWT_SECRET
};
