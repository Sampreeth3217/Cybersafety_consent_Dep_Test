import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import consentRoutes from './routes/consent.js';
import managerRoutes from './routes/manager.js';
import bankerRoutes from './routes/banker.js';
import muleAccountRoutes from './routes/muleAccount.js';
import policeRoutes from './routes/police.js';
import policeAnalyticsRoutes from './routes/policeAnalytics.js';

// Load environment variables
dotenv.config();

const app = express();

// Handle preflight requests
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.status(200).end();
});

// Add CORS headers to all responses
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// Allow all CORS requests
app.use(cors({
  origin: '*',
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Routes
app.use('/api/consent', consentRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/banker', bankerRoutes);
app.use('/api/mule-account', muleAccountRoutes);
app.use('/api/police', policeRoutes);
app.use('/api/police/analytics', policeAnalyticsRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Cybersafety Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      consent: '/api/consent',
      manager: '/api/manager',
      banker: '/api/banker',
      muleAccount: '/api/mule-account',
      police: '/api/police',
      policeAnalytics: '/api/police/analytics'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// For local development
const PORT = process.env.PORT || 5001;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel serverless
export default app;
