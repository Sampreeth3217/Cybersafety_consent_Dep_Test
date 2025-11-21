import express from 'express';
import ConsentRecord from '../../models/ConsentRecord.js';
import { verifyToken, generateToken } from '../../middleware/auth.js';
import { validateToken } from '../../utils/validators.js';

const router = express.Router();

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

    // Check against environment variables
    const validUsername = process.env.MANAGER_USER;
    const validPassword = process.env.MANAGER_PASS;

    if (!validUsername || !validPassword) {
      console.error('Manager credentials not configured in environment variables');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error'
      });
    }

    // Simple comparison (in production, use bcrypt for hashed passwords)
    if (username !== validUsername || password !== validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = generateToken(username);

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
router.get('/consent/:token', verifyToken, async (req, res) => {
  try {
    const { token } = req.params;

    // Validate token format
    if (!validateToken(token)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid token format. Token must be exactly 7 alphanumeric characters.'
      });
    }

    // Lookup consent record
    const record = await ConsentRecord.findOne({ 
      token: token.toUpperCase() 
    }).select('name token language createdAt');

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'No record found for this token'
      });
    }

    res.json({
      success: true,
      data: {
        name: record.name,
        token: record.token,
        language: record.language === 'en' ? 'English' : 'Telugu',
        languageCode: record.language,
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
