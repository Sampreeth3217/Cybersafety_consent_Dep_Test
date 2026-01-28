import dotenv from 'dotenv';
import mongoose from 'mongoose';
import ConsentRecord from '../models/ConsentRecord.js';

dotenv.config();

const addTestRecords = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Generate test records for the past 30 days
    const testRecords = [];
    const now = new Date();

    for (let i = 0; i < 50; i++) {
      const daysAgo = Math.floor(Math.random() * 30);
      const createdAt = new Date(now);
      createdAt.setDate(createdAt.getDate() - daysAgo);

      const randomToken = Math.random().toString(36).substring(2, 9).toUpperCase();
      
      testRecords.push({
        name: `Test User ${i + 1}`,
        token: randomToken,
        language: Math.random() > 0.5 ? 'en' : 'te',
        createdAt: createdAt
      });
    }

    // Insert test records
    const result = await ConsentRecord.insertMany(testRecords);
    console.log(`✅ Successfully added ${result.length} test consent records`);

    // Show summary
    const total = await ConsentRecord.countDocuments();
    console.log(`📊 Total consent records in database: ${total}`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error adding test records:', error);
    process.exit(1);
  }
};

addTestRecords();
