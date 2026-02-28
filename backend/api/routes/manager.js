import express from 'express';
import ConsentRecord from '../../models/ConsentRecord.js';
import { verifyToken, generateToken } from '../../middleware/auth.js';
import { validateToken } from '../../utils/validators.js';

const router = express.Router();

/**
 * GET /api/manager
 * Test endpoint for manager route
 */
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Manager API endpoint is working',
    methods: [
      'POST /api/manager/login - Manager authentication',
      'GET /api/manager/consent/:token - Lookup consent record',
      'GET /api/manager/verify - Verify token'
    ]
  });
});

/**
 * POST /api/manager/login
 * Manager authentication
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate credentials
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Normalize inputs (trim) and check against environment variables
    const inputUsername = String(username).trim();
    const inputPassword = String(password).trim();

    const validUsername = (process.env.MANAGER_USER || '').trim();
    const validPassword = (process.env.MANAGER_PASS || '').trim();
    const jwtSecret = (process.env.JWT_SECRET || '').trim();

    if (!validUsername || !validPassword) {
      console.error('Manager credentials not configured in environment variables');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error'
      });
    }

    if (!jwtSecret) {
      console.error('JWT_SECRET not configured in environment variables');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error'
      });
    }

    // Simple comparison (in production, use bcrypt for hashed passwords)
    if (inputUsername !== validUsername || inputPassword !== validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = generateToken(validUsername);

    res.json({
      success: true,
      message: 'Login successful',
      token
    });

  } catch (error) {
    console.error('Manager login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * GET /api/manager/consent/:token
 * Lookup consent record by token (requires authentication)
 */
// Public access: remove verification for manager dashboard queries
router.get('/consent/:token', async (req, res) => {
  try {
    const { token } = req.params;

    // Validate token format (now supports D-, I-, O- prefixes)
    if (!token || !/^[DIO]-[A-Z0-9]{7}$/.test(token)) {
      // Also check for old format tokens (backward compatibility)
      if (!/^[A-Z0-9]{7}$/.test(token)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid token format. Token must be in format: D-/I-/O- followed by 7 alphanumeric characters, or 7 alphanumeric characters for legacy tokens.'
        });
      }
    }

    // Lookup consent record
    const record = await ConsentRecord.findOne({ 
      token: token.toUpperCase() 
    }).select('name token language category createdAt');

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'No record found for this token'
      });
    }

    // Get category display name
    const categoryNames = {
      'digital-arrest': 'Digital Arrest',
      'investment-fraud': 'Investment Fraud',
      'other-cybercrimes': 'Other Cybercrimes'
    };

    res.json({
      success: true,
      data: {
        name: record.name,
        token: record.token,
        language: record.language === 'en' ? 'English' : 'Telugu',
        languageCode: record.language,
        category: categoryNames[record.category] || record.category,
        categoryCode: record.category,
        createdAt: record.createdAt
      }
    });

  } catch (error) {
    console.error('Error fetching consent record:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch consent record',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * GET /api/manager/verify
 * Verify if the manager token is valid
 */
router.get('/verify', verifyToken, (req, res) => {
  res.json({
    success: true,
    message: 'Token is valid',
    user: req.user
  });
});

export default router;
