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
    length: [7, 'Token must be exactly 7 characters'],
    match: [/^[A-Z0-9]{7}$/, 'Token must be 7 alphanumeric characters']
  },
  language: {
    type: String,
    required: [true, 'Language is required'],
    enum: {
      values: ['en', 'te'],
      message: 'Language must be either "en" or "te"'
    }
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

// Index on token for fast lookups
ConsentRecordSchema.index({ token: 1 });
// Index on mobile number for duplicate checking
ConsentRecordSchema.index({ mobileNumber: 1 });

// Update the updatedAt field on save
ConsentRecordSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const ConsentRecord = mongoose.model('ConsentRecord', ConsentRecordSchema);

export default ConsentRecord;
