import express from 'express';
import ConsentRecord from '../../models/ConsentRecord.js';
import { validateToken, validateName, validateLanguage, sanitizeInput } from '../../utils/validators.js';

const router = express.Router();

/**
 * GET /api/consent
 * Test endpoint for consent route
 */
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Consent API endpoint is working',
    methods: ['POST /api/consent - Submit consent record']
  });
});

/**
 * POST /api/consent
 * Create a new consent record
 */
router.post('/', async (req, res) => {
  // Ensure CORS headers are set
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  try {
    const { name, token, language } = req.body;

    // Validate inputs
    if (!validateName(name)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid name. Name is required and must be less than 200 characters.'
      });
    }

    if (!validateToken(token)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid token. Token must be exactly 7 alphanumeric characters.'
      });
    }

    if (!validateLanguage(language)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid language. Language must be "en" or "te".'
      });
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);

    // Check if token already exists
    const existingRecord = await ConsentRecord.findOne({ token });
    if (existingRecord) {
      return res.status(409).json({
        success: false,
        message: 'This token already exists. Please generate a new token.'
      });
    }

    // Create new consent record
    const consentRecord = new ConsentRecord({
      name: sanitizedName,
      token: token.toUpperCase(),
      language
    });

    await consentRecord.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Consent record created successfully',
      data: {
        id: consentRecord._id,
        token: consentRecord.token,
        name: consentRecord.name,
        language: consentRecord.language,
        createdAt: consentRecord.createdAt
      }
    });

  } catch (error) {
    console.error('Error creating consent record:', error);
    
    // Handle duplicate token error from MongoDB
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'This token already exists. Please generate a new token.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create consent record',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;
