import mongoose from 'mongoose';

/**
 * Mule Account Schema
 * Stores information about suspicious mule accounts reported by bankers
 */
const muleAccountSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: true,
    trim: true
  },
  accountOpeningDate: {
    type: Date,
    required: true
  },
  accountHolderName: {
    type: String,
    required: true,
    trim: true
  },
  remarks: {
    type: String,
    required: true,
    trim: true
  },
  addedBy: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  },
  bankIfscCode: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  }
});

// Indexes for faster queries
muleAccountSchema.index({ addedBy: 1, addedAt: -1 });
muleAccountSchema.index({ accountNumber: 1 });

const MuleAccount = mongoose.model('MuleAccount', muleAccountSchema);

export default MuleAccount;
