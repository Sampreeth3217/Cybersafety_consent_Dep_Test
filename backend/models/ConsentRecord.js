import mongoose from 'mongoose';

const ConsentRecordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [200, 'Name cannot exceed 200 characters']
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required'],
    trim: true,
    match: [/^[6-9]\d{9}$/, 'Mobile number must be a valid 10-digit Indian mobile number']
  },
  token: {
    type: String,
    required: [true, 'Token is required'],
    unique: true,
    minlength: [7, 'Token must be at least 7 characters']
  },
  language: {
    type: String,
    required: [true, 'Language is required'],
    enum: {
      values: ['en', 'te'],
      message: 'Language must be either "en" or "te"'
    }
  },
  category: {
    type: String,
    required: false,
    enum: {
      values: ['digital-arrest', 'investment-fraud', 'other-cybercrimes'],
      message: 'Category must be one of: digital-arrest, investment-fraud, other-cybercrimes'
    },
    default: 'digital-arrest'
  },
  bankName: {
    type: String,
    trim: true,
    default: ''
  },
  bankBranch: {
    type: String,
    trim: true,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index on mobile number and category for duplicate checking
ConsentRecordSchema.index({ mobileNumber: 1, category: 1 });
// Index on category for filtering
ConsentRecordSchema.index({ category: 1 });

// Update the updatedAt field on save
ConsentRecordSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const ConsentRecord = mongoose.model('ConsentRecord', ConsentRecordSchema);

export default ConsentRecord;
