import express from 'express';
import { generatePoliceToken, authenticatePolice, validatePoliceCredentials } from '../../middleware/policeAuth.js';
import ConsentRecord from '../../models/ConsentRecord.js';

const router = express.Router();

/**
 * POST /api/police/login
 * Authenticate police with username and password
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Validate credentials
    if (!validatePoliceCredentials(username, password)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    // Generate JWT token
    const token = generatePoliceToken(username);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        username,
        expiresIn: '8 hours'
      }
    });

  } catch (error) {
    console.error('Police login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

/**
 * GET /api/police/verify
 * Verify if police token is valid
 */
router.get('/verify', authenticatePolice, (req, res) => {
  res.json({
    success: true,
    data: {
      username: req.police.username,
      authenticated: true
    }
  });
});

/**
 * POST /api/police/logout
 * Logout police (client-side token removal)
 */
router.post('/logout', authenticatePolice, (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

/**
 * GET /api/police/all-records
 * Get all consent records with pagination and optional date filtering
 */
router.get('/all-records', authenticatePolice, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const category = req.query.category;

    console.log(`Fetching all records - page ${page}, limit ${limit}`, { startDate, endDate, category });

    // Build filter object
    const filter = {};
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        // Add 1 day to endDate to include the entire day
        const end = new Date(endDate);
        end.setDate(end.getDate() + 1);
        filter.createdAt.$lte = end;
      }
    }
    if (category) {
      // For digital-arrest, include old records without category
      if (category === 'digital-arrest') {
        filter.$or = [
          { category: 'digital-arrest' },
          { category: { $exists: false } },
          { category: null },
          { category: '' }
        ];
      } else {
        filter.category = category;
      }
    }

    // Get total count
    const totalRecords = await ConsentRecord.countDocuments(filter);
    
    // Get paginated records
    const records = await ConsentRecord.find(filter)
      .select('name mobileNumber language token category bankName bankBranch createdAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Ensure old records without category are treated as 'digital-arrest'
    const recordsWithCategory = records.map(record => {
      const recordObj = record.toObject();
      if (!recordObj.category) {
        recordObj.category = 'digital-arrest';
      }
      return recordObj;
    });

    const totalPages = Math.ceil(totalRecords / limit);

    console.log(`Found ${records.length} records (total: ${totalRecords})`);

    res.json({
      success: true,
      records: recordsWithCategory,
      totalPages,
      pagination: {
        currentPage: page,
        totalPages,
        totalRecords,
        recordsPerPage: limit
      }
    });

  } catch (error) {
    console.error('All records fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching consent records'
    });
  }
});

/**
 * GET /api/police/all-records/csv
 * Download all consent records as CSV with optional date filtering
 */
router.get('/all-records/csv', authenticatePolice, async (req, res) => {
  try {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const category = req.query.category;

    console.log('Generating CSV export', { startDate, endDate, category });

    // Build filter object
    const filter = {};
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        // Add 1 day to endDate to include the entire day
        const end = new Date(endDate);
        end.setDate(end.getDate() + 1);
        filter.createdAt.$lte = end;
      }
    }
    if (category) {
      // For digital-arrest, include old records without category
      if (category === 'digital-arrest') {
        filter.$or = [
          { category: 'digital-arrest' },
          { category: { $exists: false } },
          { category: null },
          { category: '' }
        ];
      } else {
        filter.category = category;
      }
    }

    // Get all records matching the filter
    const records = await ConsentRecord.find(filter)
      .select('name mobileNumber language token category bankName bankBranch createdAt')
      .sort({ createdAt: -1 });

    console.log(`Exporting ${records.length} records to CSV`);

    // Category display names
    const categoryNames = {
      'digital-arrest': 'Digital Arrest',
      'investment-fraud': 'Investment Fraud',
      'other-cybercrimes': 'Other Cybercrimes'
    };

    // Generate CSV header
    let csv = 'S.No,Token,Name,Mobile Number,Language,Category,Bank Name,Branch,Created At\n';

    // Add records to CSV
    records.forEach((record, index) => {
      const createdAt = new Date(record.createdAt).toLocaleString('en-IN');
      const language = record.language === 'en' ? 'English' : 'Telugu';
      const mobile = record.mobileNumber || 'N/A';
      const category = categoryNames[record.category] || record.category || 'Digital Arrest';
      const bankName = record.bankName || 'N/A';
      const bankBranch = record.bankBranch || 'N/A';
      
      // Escape fields that may contain commas or quotes
      const token = `"${record.token}"`;
      const name = `"${record.name.replace(/"/g, '""')}"`;
      const mobileEscaped = `"${mobile}"`;
      const bankNameEscaped = `"${bankName.replace(/"/g, '""')}"`;
      const bankBranchEscaped = `"${bankBranch.replace(/"/g, '""')}"`;
      
      csv += `${index + 1},${token},${name},${mobileEscaped},${language},"${category}",${bankNameEscaped},${bankBranchEscaped},"${createdAt}"\n`;
    });

    // Set headers for CSV download
    const timestamp = new Date().toISOString().split('T')[0];
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="consent-records-${timestamp}.csv"`);
    
    res.send(csv);

  } catch (error) {
    console.error('CSV export error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating CSV export'
    });
  }
});

export default router;
