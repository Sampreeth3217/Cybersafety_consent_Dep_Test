import express from 'express';
import Banker from '../../models/Banker.js';
import { bankerCredentials } from '../../config/bankerCredentials.js';
import { generateBankerToken, authenticateBanker } from '../../middleware/bankerAuth.js';

const router = express.Router();

/**
 * POST /api/banker/login
 * Authenticate banker with IFSC code and password
 */
router.post('/login', async (req, res) => {
  try {
    const { ifscCode, password } = req.body;

    // Validate input
    if (!ifscCode || !password) {
      return res.status(400).json({
        success: false,
        message: 'IFSC code and password are required'
      });
    }

    const upperIfscCode = ifscCode.toUpperCase().trim();

    // Check if IFSC code exists in our credentials
    const credentials = bankerCredentials[upperIfscCode];
    if (!credentials) {
      return res.status(401).json({
        success: false,
        message: 'Invalid IFSC code or password'
      });
    }

    // Verify password
    if (credentials.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid IFSC code or password'
      });
    }

    // Update or create banker record
    let banker = await Banker.findOne({ ifscCode: upperIfscCode });
    if (!banker) {
      banker = new Banker({
        ifscCode: upperIfscCode,
        password: credentials.password
      });
    }
    
    banker.lastLogin = new Date();
    await banker.save();

    // Generate JWT token
    const token = generateBankerToken(upperIfscCode);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        ifscCode: upperIfscCode,
        expiresIn: '30 days'
      }
    });

  } catch (error) {
    console.error('Banker login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

/**
 * GET /api/banker/verify
 * Verify if banker token is valid
 */
router.get('/verify', authenticateBanker, (req, res) => {
  res.json({
    success: true,
    data: {
      ifscCode: req.banker.ifscCode,
      authenticated: true
    }
  });
});

/**
 * POST /api/banker/logout
 * Logout banker (client-side token removal)
 */
router.post('/logout', authenticateBanker, (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

export default router;
