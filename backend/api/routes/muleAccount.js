import express from 'express';
import MuleAccount from '../../models/MuleAccount.js';
import { authenticateBanker } from '../../middleware/bankerAuth.js';

const router = express.Router();

/**
 * POST /api/mule-account/add
 * Add new mule account information
 */
router.post('/add', authenticateBanker, async (req, res) => {
  try {
    const { accountNumber, accountOpeningDate, accountHolderName, remarks } = req.body;
    const { ifscCode } = req.banker;

    // Validate required fields
    if (!accountNumber || !accountOpeningDate || !accountHolderName || !remarks) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Create new mule account record
    const muleAccount = new MuleAccount({
      accountNumber: accountNumber.trim(),
      accountOpeningDate: new Date(accountOpeningDate),
      accountHolderName: accountHolderName.trim(),
      remarks: remarks.trim(),
      addedBy: ifscCode,
      bankIfscCode: ifscCode
    });

    await muleAccount.save();

    res.status(201).json({
      success: true,
      message: 'Mule account information added successfully',
      data: muleAccount
    });

  } catch (error) {
    console.error('Add mule account error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding mule account'
    });
  }
});

/**
 * GET /api/mule-account/list
 * Get all mule accounts added by the authenticated banker
 */
router.get('/list', authenticateBanker, async (req, res) => {
  try {
    const { ifscCode } = req.banker;

    // Fetch all mule accounts added by this banker
    const muleAccounts = await MuleAccount.find({ addedBy: ifscCode })
      .sort({ addedAt: -1 }) // Most recent first
      .lean();

    res.json({
      success: true,
      data: {
        accounts: muleAccounts,
        count: muleAccounts.length
      }
    });

  } catch (error) {
    console.error('List mule accounts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching mule accounts'
    });
  }
});

/**
 * GET /api/mule-account/:id
 * Get details of a specific mule account (only if added by the authenticated banker)
 */
router.get('/:id', authenticateBanker, async (req, res) => {
  try {
    const { ifscCode } = req.banker;
    const { id } = req.params;

    const muleAccount = await MuleAccount.findOne({
      _id: id,
      addedBy: ifscCode
    });

    if (!muleAccount) {
      return res.status(404).json({
        success: false,
        message: 'Mule account not found or access denied'
      });
    }

    res.json({
      success: true,
      data: muleAccount
    });

  } catch (error) {
    console.error('Get mule account error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching mule account'
    });
  }
});

/**
 * GET /api/mule-account/stats
 * Get statistics about mule accounts added by the banker
 */
router.get('/stats/summary', authenticateBanker, async (req, res) => {
  try {
    const { ifscCode } = req.banker;

    const totalAccounts = await MuleAccount.countDocuments({ addedBy: ifscCode });
    
    const recentAccounts = await MuleAccount.find({ addedBy: ifscCode })
      .sort({ addedAt: -1 })
      .limit(5)
      .lean();

    res.json({
      success: true,
      data: {
        totalAccounts,
        recentAccounts
      }
    });

  } catch (error) {
    console.error('Get mule account stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics'
    });
  }
});

export default router;
