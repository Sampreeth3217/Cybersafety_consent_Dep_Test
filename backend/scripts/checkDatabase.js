import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import ConsentRecord from '../models/ConsentRecord.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from backend directory
dotenv.config({ path: join(__dirname, '..', '.env') });

const checkDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Get total count
    const total = await ConsentRecord.countDocuments();
    console.log(`📊 Total records: ${total}\n`);

    // Get recent records
    const records = await ConsentRecord.find().sort({ createdAt: -1 }).limit(10);
    console.log('📋 Most recent 10 records:');
    records.forEach((record, i) => {
      console.log(`${i + 1}. ${record.name} - Token: ${record.token} - Created: ${record.createdAt.toISOString()}`);
    });

    // Check date ranges
    const now = new Date();
    console.log(`\n🕐 Current time: ${now.toISOString()}`);
    
    const todayStart = new Date(now);
    todayStart.setUTCHours(0, 0, 0, 0);
    console.log(`📅 Today start (UTC): ${todayStart.toISOString()}`);
    
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - 7);
    weekStart.setUTCHours(0, 0, 0, 0);
    console.log(`📅 Week start (UTC): ${weekStart.toISOString()}`);
    
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    monthStart.setUTCHours(0, 0, 0, 0);
    console.log(`📅 Month start (UTC): ${monthStart.toISOString()}\n`);

    // Count by date ranges
    const todayCount = await ConsentRecord.countDocuments({ createdAt: { $gte: todayStart } });
    const weekCount = await ConsentRecord.countDocuments({ createdAt: { $gte: weekStart } });
    const monthCount = await ConsentRecord.countDocuments({ createdAt: { $gte: monthStart } });

    console.log('📈 Counts by date range:');
    console.log(`   Today: ${todayCount}`);
    console.log(`   Last 7 days: ${weekCount}`);
    console.log(`   This month: ${monthCount}`);
    console.log(`   Total: ${total}`);

    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

checkDatabase();
