import express from 'express';
import ConsentRecord from '../../models/ConsentRecord.js';
import MuleAccount from '../../models/MuleAccount.js';
import { authenticatePolice } from '../../middleware/policeAuth.js';

const router = express.Router();

/**
 * GET /api/police/analytics/test
 * Test endpoint to check database connection and data
 */
router.get('/test', authenticatePolice, async (req, res) => {
  try {
    const totalRecords = await ConsentRecord.countDocuments();
    const sampleRecords = await ConsentRecord.find().limit(5).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: {
        totalRecords,
        sampleRecords,
        message: 'Database connection successful'
      }
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    res.status(500).json({
      success: false,
      message: 'Database test failed',
      error: error.message
    });
  }
});

/**
 * GET /api/police/analytics/summary
 * Get summary statistics: today, this week, this month
 */
router.get('/summary', authenticatePolice, async (req, res) => {
  try {
    console.log('Fetching analytics summary...');
    
    const now = new Date();
    
    // Today start (midnight UTC)
    const todayStart = new Date(now);
    todayStart.setUTCHours(0, 0, 0, 0);
    
    // Week start (7 days ago from midnight)
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - 7);
    weekStart.setUTCHours(0, 0, 0, 0);
    
    // Month start (first day of current month)
    const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0));

    console.log('Date ranges:', { 
      now: now.toISOString(),
      todayStart: todayStart.toISOString(), 
      weekStart: weekStart.toISOString(), 
      monthStart: monthStart.toISOString() 
    });

    const [todayCount, weekCount, monthCount, totalCount] = await Promise.all([
      ConsentRecord.countDocuments({ createdAt: { $gte: todayStart } }),
      ConsentRecord.countDocuments({ createdAt: { $gte: weekStart } }),
      ConsentRecord.countDocuments({ createdAt: { $gte: monthStart } }),
      ConsentRecord.countDocuments()
    ]);

    console.log('Counts:', { todayCount, weekCount, monthCount, totalCount });

    res.json({
      success: true,
      data: {
        todayEntries: todayCount,
        weekEntries: weekCount,
        monthEntries: monthCount,
        totalEntries: totalCount
      }
    });

  } catch (error) {
    console.error('Analytics summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics summary',
      error: error.message
    });
  }
});

/**
 * GET /api/police/analytics/daily
 * Get daily entries for the last 30 days
 */
router.get('/daily', authenticatePolice, async (req, res) => {
  try {
    console.log('Fetching daily analytics...');
    
    const days = parseInt(req.query.days) || 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    console.log('Daily query start date:', startDate);

    const records = await ConsentRecord.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    console.log('Daily records found:', records.length);

    res.json({
      success: true,
      data: records.map(r => ({
        _id: r._id,
        count: r.count
      }))
    });

  } catch (error) {
    console.error('Daily analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching daily analytics',
      error: error.message
    });
  }
});

/**
 * GET /api/police/analytics/monthly
 * Get monthly entries for the last 12 months
 */
router.get('/monthly', authenticatePolice, async (req, res) => {
  try {
    console.log('Fetching monthly analytics...');
    
    const months = parseInt(req.query.months) || 12;
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);

    console.log('Monthly query start date:', startDate);

    const records = await ConsentRecord.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    console.log('Monthly records found:', records.length);

    res.json({
      success: true,
      data: records.map(r => ({
        _id: r._id,
        count: r.count
      }))
    });

  } catch (error) {
    console.error('Monthly analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching monthly analytics',
      error: error.message
    });
  }
});

/**
 * GET /api/police/mule-accounts
 * Get all mule accounts with banker information
 */
router.get('/mule-accounts', authenticatePolice, async (req, res) => {
  try {
    const muleAccounts = await MuleAccount.find()
      .sort({ addedAt: -1 })
      .lean();

    res.json({
      success: true,
      data: {
        accounts: muleAccounts,
        count: muleAccounts.length
      }
    });

  } catch (error) {
    console.error('Fetch mule accounts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching mule accounts'
    });
  }
});

/**
 * DELETE /api/police/mule-accounts/:id
 * Delete a mule account record
 */
router.delete('/mule-accounts/:id', authenticatePolice, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAccount = await MuleAccount.findByIdAndDelete(id);

    if (!deletedAccount) {
      return res.status(404).json({
        success: false,
        message: 'Mule account not found'
      });
    }

    res.json({
      success: true,
      message: 'Mule account deleted successfully',
      data: deletedAccount
    });

  } catch (error) {
    console.error('Delete mule account error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting mule account'
    });
  }
});

/**
 * GET /api/police/mule-accounts/stats
 * Get mule account statistics
 */
router.get('/mule-accounts/stats', authenticatePolice, async (req, res) => {
  try {
    const totalAccounts = await MuleAccount.countDocuments();
    
    const accountsByBank = await MuleAccount.aggregate([
      {
        $group: {
          _id: "$bankIfscCode",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ]);

    res.json({
      success: true,
      data: {
        total: totalAccounts,
        byBank: accountsByBank.map(b => ({
          ifscCode: b._id,
          count: b.count
        }))
      }
    });

  } catch (error) {
    console.error('Mule account stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching mule account statistics'
    });
  }
});

/**
 * GET /api/police/analytics/banks
 * Get comprehensive bank analytics
 */
router.get('/banks', authenticatePolice, async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;
    console.log('Fetching bank analytics...', { startDate, endDate, category });

    // Build filter object
    const filter = {};
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
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

    // Top banks by consent records - exclude records without bank information
    const topBanks = await ConsentRecord.aggregate([
      { $match: filter },
      // Filter out empty or null bank names
      {
        $match: {
          bankName: { $exists: true, $ne: '', $ne: null },
          $expr: { $gt: [{ $strLenCP: { $ifNull: ['$bankName', ''] } }, 0] }
        }
      },
      {
        $group: {
          _id: '$bankName',
          count: { $sum: 1 },
          categories: { $push: '$category' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);

    // Top branches by consent records
    const topBranches = await ConsentRecord.aggregate([
      { $match: filter },
      // Filter out empty or null branch names
      {
        $match: {
          bankBranch: { $exists: true, $ne: '', $ne: null },
          bankName: { $exists: true, $ne: '', $ne: null },
          $expr: {
            $and: [
              { $gt: [{ $strLenCP: { $ifNull: ['$bankBranch', ''] } }, 0] },
              { $gt: [{ $strLenCP: { $ifNull: ['$bankName', ''] } }, 0] }
            ]
          }
        }
      },
      {
        $group: {
          _id: '$bankBranch',
          count: { $sum: 1 },
          banks: { $addToSet: '$bankName' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);

    // Bank and branch combinations
    const bankBranchCombos = await ConsentRecord.aggregate([
      { $match: filter },
      // Filter out empty or null bank/branch names
      {
        $match: {
          bankName: { $exists: true, $ne: '', $ne: null },
          bankBranch: { $exists: true, $ne: '', $ne: null },
          $expr: {
            $and: [
              { $gt: [{ $strLenCP: { $ifNull: ['$bankName', ''] } }, 0] },
              { $gt: [{ $strLenCP: { $ifNull: ['$bankBranch', ''] } }, 0] }
            ]
          }
        }
      },
      {
        $group: {
          _id: {
            bank: '$bankName',
            branch: '$bankBranch'
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 30 }
    ]);

    // Category breakdown by bank
    const categoryByBank = await ConsentRecord.aggregate([
      { $match: filter },
      // Filter out empty or null bank names
      {
        $match: {
          bankName: { $exists: true, $ne: '', $ne: null },
          $expr: { $gt: [{ $strLenCP: { $ifNull: ['$bankName', ''] } }, 0] }
        }
      },
      {
        $group: {
          _id: {
            bank: '$bankName',
            category: '$category'
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.bank': 1, count: -1 } }
    ]);

    // Daily trend for top 5 banks
    const top5Banks = topBanks.slice(0, 5).map(b => b._id);
    const dailyTrend = await ConsentRecord.aggregate([
      { 
        $match: { 
          ...filter,
          bankName: { $in: top5Banks, $ne: '', $ne: null },
          $expr: { $gt: [{ $strLenCP: { $ifNull: ['$bankName', ''] } }, 0] }
        } 
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            bank: '$bankName'
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.date': 1 } }
    ]);

    // Overall statistics - only count records with valid bank information
    const bankFilter = {
      ...filter,
      bankName: { $exists: true, $ne: '', $ne: null },
      bankBranch: { $exists: true, $ne: '', $ne: null }
    };
    const totalRecords = await ConsentRecord.countDocuments(bankFilter);
    const uniqueBanks = await ConsentRecord.distinct('bankName', bankFilter);
    const uniqueBranches = await ConsentRecord.distinct('bankBranch', bankFilter);

    res.json({
      success: true,
      data: {
        overview: {
          totalRecords,
          totalBanks: uniqueBanks.filter(b => b && b.trim()).length,
          totalBranches: uniqueBranches.filter(b => b && b.trim()).length
        },
        topBanks: topBanks.map(b => ({
          bankName: b._id,
          count: b.count,
          digitalArrestCount: b.categories.filter(c => c === 'digital-arrest').length,
          investmentFraudCount: b.categories.filter(c => c === 'investment-fraud').length,
          otherCybercrimesCount: b.categories.filter(c => c === 'other-cybercrimes').length
        })),
        topBranches: topBranches.map(b => ({
          branchName: b._id,
          count: b.count,
          uniqueBanks: b.banks.length
        })),
        bankBranchCombinations: bankBranchCombos.map(c => ({
          bankName: c._id.bank,
          branchName: c._id.branch,
          count: c.count
        })),
        categoryByBank: categoryByBank.map(c => ({
          bankName: c._id.bank,
          category: c._id.category,
          count: c.count
        })),
        dailyTrend: dailyTrend.map(d => ({
          date: d._id.date,
          bankName: d._id.bank,
          count: d.count
        }))
      }
    });

  } catch (error) {
    console.error('Bank analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bank analytics',
      error: error.message
    });
  }
});

/**
 * GET /api/police/all-records
 * Get all consent records with pagination
 */
router.get('/all-records', authenticatePolice, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    console.log(`Fetching all records - page ${page}, limit ${limit}`);

    // Get total count
    const totalRecords = await ConsentRecord.countDocuments();
    
    // Get paginated records
    const records = await ConsentRecord.find()
      .select('name mobileNumber language token createdAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalRecords / limit);

    console.log(`Found ${records.length} records (total: ${totalRecords})`);

    res.json({
      success: true,
      records,
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

export default router;
