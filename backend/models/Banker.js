import mongoose from 'mongoose';

/**
 * Banker Schema
 * Stores banker login information and session tokens
 */
const bankerSchema = new mongoose.Schema({
  ifscCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  password: {
    type: String,
    required: true
  },
  bankName: {
    type: String,
    trim: true
  },
  policeStation: {
    type: String,
    trim: true
  },
  lastLogin: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Banker = mongoose.model('Banker', bankerSchema);

export default Banker;
