# Complete Application Guide - CyberSuraksha Consent System

**Developed By: Nimmagadda Sampreeth Chowdary**

## Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [File Structure & Purpose](#file-structure--purpose)
5. [Environment Setup](#environment-setup)
6. [Local Development](#local-development)
7. [Server Deployment](#server-deployment)
8. [API Documentation](#api-documentation)
9. [Database Schema](#database-schema)
10. [Authentication & Security](#authentication--security)
11. [Configuration Files](#configuration-files)
12. [Troubleshooting](#troubleshooting)

---

## Project Overview

**CyberSuraksha** is a comprehensive consent management system designed to help victims of cybercrime provide consent for law enforcement to access their banking information. The system includes multiple user interfaces for different stakeholders:

- **Public Consent Portal**: For victims to provide consent
- **Banker Dashboard**: For bank employees to report suspicious mule accounts
- **Police Dashboard**: For law enforcement to access consent records and mule accounts
- **Manager Dashboard**: For system administrators to view all records

### Key Features
- Bilingual support (English & Telugu)
- Voice-based consent recording
- Secure token-based consent tracking
- Banker authentication system
- Police access control
- Mule account tracking
- Real-time analytics

---

## System Architecture

### High-Level Architecture
```
┌─────────────────┐
│   Frontend      │ (React + Vite)
│   Port: 3001    │ - User Interfaces
└────────┬────────┘ - Speech Recognition
         │          - AI Chatbot (Gemini)
         │
    ┌────▼────┐
    │   API   │
    │ Gateway │
    └────┬────┘
         │
┌────────▼─────────┐
│    Backend       │ (Node.js + Express)
│    Port: 5001    │ - REST API
└────────┬─────────┘ - Authentication
         │           - Business Logic
         │
    ┌────▼────┐
    │ MongoDB │ - ConsentRecords
    │ Atlas  │  - MuleAccounts
    └─────────┘  - Bankers
```

### Application Flow
1. **Consent Flow**: User → Language Selection → Name Input → Consent Recording → Token Generation
2. **Banker Flow**: Login → Dashboard → Add/View Mule Accounts
3. **Police Flow**: Login → Dashboard → Search Records → View Analytics
4. **Manager Flow**: Login → Search by Token → View Consent Details

---

## Technology Stack

### Frontend
- **Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.8
- **Routing**: React Router DOM 6.21.0
- **HTTP Client**: Axios 1.6.2
- **AI Integration**: Google Generative AI (Gemini)
- **Speech Recognition**: Web Speech API

### Backend
- **Runtime**: Node.js
- **Framework**: Express 4.18.2
- **Database**: MongoDB (Mongoose 8.0.3)
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: bcryptjs 2.4.3
- **CORS**: cors 2.8.5

### Deployment
- **Platform**: Vercel (Serverless)
- **Database**: MongoDB Atlas
- **Frontend Hosting**: Vercel Static
- **Backend**: Vercel Serverless Functions

---

## File Structure & Purpose

### Root Directory Files
```
Cybersafety_consent_Deployed/
├── package.json                  # Root package with workspace scripts
├── vercel.json                   # Main Vercel deployment config
├── generateBankerCSV.js          # Script to generate banker credentials
├── Banker_Credentials.csv        # List of valid IFSC codes and passwords
└── *.md files                    # Documentation files
```

### Frontend Directory (`/frontend`)

#### Core Application Files
```
frontend/
├── index.html                    # HTML entry point
├── package.json                  # Frontend dependencies
├── vite.config.js               # Vite configuration (port: 3001)
├── vercel.json                  # Frontend Vercel config
└── .env                         # Environment variables
```

**Purpose of Key Files**:
- **`vite.config.js`**: Configures dev server on port 3001, API proxy to port 5001
- **`.env`**: Contains `VITE_API_URL` (backend URL) and `VITE_GEMINI_API_KEY`

#### Source Code (`/frontend/src`)

**Entry Points**:
- **`main.jsx`**: Application bootstrap, renders App component
- **`App.jsx`**: Main routing configuration for all pages
- **`App.css`**: Global application styles
- **`index.css`**: CSS variables and theme definitions

**Pages** (`/frontend/src/pages/`):
| File | Purpose | Route |
|------|---------|-------|
| `MainLandingPage.jsx` | Home page with language selection | `/` |
| `CybersafetyConsentPage.jsx` | Consent flow entry | `/cybersuraksha` |
| `ConsentFlowPage.jsx` | Voice consent recording | `/cybersuraksha/flow` |
| `ConfirmationPage.jsx` | Token display after consent | `/cybersuraksha/confirmation` |
| `BankerLoginPage.jsx` | Banker authentication | `/cybersuraksha/banker` |
| `BankerDashboardPage.jsx` | Banker home screen | `/cybersuraksha/banker/dashboard` |
| `AddMuleAccountPage.jsx` | Add suspicious accounts | `/cybersuraksha/banker/add-mule-account` |
| `ViewMuleAccountsPage.jsx` | View reported accounts | `/cybersuraksha/banker/view-mule-accounts` |
| `PoliceLoginPage.jsx` | Police authentication | `/cybersuraksha/police` |
| `PoliceDashboardPage.jsx` | Police dashboard | `/cybersuraksha/police/dashboard` |
| `PoliceAllRecordsPage.jsx` | View all consent records | `/cybersuraksha/police/all-records` |
| `PoliceMuleAccountsPage.jsx` | View mule accounts | `/cybersuraksha/police/mule-accounts` |
| `ManagerLoginPage.jsx` | Manager authentication | `/cybersuraksha/manager` |
| `ManagerDashboardPage.jsx` | Manager search & view | `/cybersuraksha/manager/dashboard` |

**Components** (`/frontend/src/components/`):
| Component | Purpose |
|-----------|---------|
| `LanguageSelector` | Language selection (English/Telugu) |
| `NameInputForm` | Collect user name and mobile |
| `StatementReader` | Display and read consent statements |
| `SpeechStatusIndicator` | Visual feedback during voice input |
| `ConsentRecordDisplay` | Display consent record details |
| `ManagerLoginForm` | Manager authentication form |
| `ManagerSearchForm` | Token-based search |
| `AIChatbot` | Gemini AI-powered assistance |

**Configuration** (`/frontend/src/config/`):
- **`constants.js`**: Routes, API URLs, language configs
- **`statements.js`**: Consent statements in English & Telugu

**Services** (`/frontend/src/services/`):
- API service modules for backend communication

### Backend Directory (`/backend`)

#### Core Files
```
backend/
├── package.json                  # Backend dependencies
├── vercel.json                   # Backend Vercel config
└── api/
    └── index.js                  # Main Express server (port: 5001)
```

**`api/index.js`** - Main Server File:
- Configures Express app
- Sets up CORS (allows all origins)
- Connects to MongoDB
- Registers all routes
- Exports app for Vercel serverless

#### API Routes (`/backend/api/routes/`)

| File | Base Route | Purpose |
|------|-----------|---------|
| `consent.js` | `/api/consent` | Submit & check consent records |
| `banker.js` | `/api/banker` | Banker authentication & profile |
| `muleAccount.js` | `/api/mule-account` | CRUD for suspicious accounts |
| `police.js` | `/api/police` | Police authentication & record access |
| `policeAnalytics.js` | `/api/police/analytics` | Statistics & analytics |
| `manager.js` | `/api/manager` | Manager authentication & search |

#### Database Models (`/backend/models/`)

**`ConsentRecord.js`**:
```javascript
{
  name: String,              // Victim's name
  mobileNumber: String,      // 10-digit Indian mobile
  token: String,             // 7-character unique token
  language: String,          // 'en' or 'te'
  consentGiven: Boolean,     // Default: false
  createdAt: Date,
  updatedAt: Date
}
```

**`MuleAccount.js`**:
```javascript
{
  accountNumber: String,
  accountOpeningDate: Date,
  accountHolderName: String,
  remarks: String,
  addedBy: String,           // Banker's IFSC code
  bankName: String,
  ifscCode: String,
  createdAt: Date
}
```

**`Banker.js`**:
```javascript
{
  ifscCode: String,          // Primary identifier
  password: String,          // Hashed password
  lastLogin: Date,
  createdAt: Date
}
```

#### Configuration (`/backend/config/`)

**`database.js`**:
- MongoDB connection with connection pooling
- Optimized for serverless (reuses connections)
- Reads `MONGODB_URI` from environment

**`bankerCredentials.js`**:
- Loads banker credentials from CSV
- Validates IFSC codes and passwords

#### Middleware (`/backend/middleware/`)

**`auth.js`**: Manager JWT authentication
**`bankerAuth.js`**: Banker authentication & token generation
**`policeAuth.js`**: Police authentication & validation

#### Utilities (`/backend/utils/`)

**`validators.js`**:
- Input validation functions
- Sanitization utilities
- Token format validation

#### Scripts (`/backend/scripts/`)

| Script | Purpose |
|--------|---------|
| `generateBankerCredentials.js` | Generate banker CSV from IFSC codes |
| `addTestConsentRecords.js` | Seed database with test data |
| `checkDatabase.js` | Verify database connectivity |

---

## Environment Setup

### Frontend Environment Variables

Create `/frontend/.env`:
```env
VITE_API_URL=https://your-backend-url.vercel.app
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

**Variables Explained**:
- `VITE_API_URL`: Backend API endpoint (use localhost:5001 for dev)
- `VITE_GEMINI_API_KEY`: Google Gemini AI API key for chatbot

### Backend Environment Variables

Required environment variables (set in Vercel/Server):
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
MANAGER_USER=admin_username
MANAGER_PASS=admin_password
JWT_SECRET=your_jwt_secret_key_min_32_chars
POLICE_USERNAME=police_user
POLICE_PASSWORD=police_pass
NODE_ENV=production
PORT=5001
```

**Variables Explained**:
- `MONGODB_URI`: MongoDB Atlas connection string
- `MANAGER_USER/PASS`: Manager login credentials
- `JWT_SECRET`: Secret for JWT token generation (min 32 chars)
- `POLICE_USERNAME/PASSWORD`: Police login credentials
- `NODE_ENV`: Environment (development/production)
- `PORT`: Backend server port (default: 5001)

---

## Local Development

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Git

### Step 1: Clone & Install
```bash
# Clone repository
git clone <repository-url>
cd Cybersafety_consent_Deployed

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Configure Environment

**Backend** (`/backend/.env`):
```env
MONGODB_URI=mongodb://localhost:27017/cybersafety
MANAGER_USER=admin
MANAGER_PASS=admin123
JWT_SECRET=your_very_long_secret_key_minimum_32_characters
POLICE_USERNAME=police
POLICE_PASSWORD=police123
NODE_ENV=development
PORT=5001
```

**Frontend** (`/frontend/.env`):
```env
VITE_API_URL=http://localhost:5001
VITE_GEMINI_API_KEY=your_api_key
```

### Step 3: Start Development Servers

**Terminal 1 - Backend**:
```bash
cd backend
npm run dev
# Server runs on http://localhost:5001
```

**Terminal 2 - Frontend**:
```bash
cd frontend
npm run dev
# App runs on http://localhost:3001
```

### Step 4: Test Application
- Open browser: `http://localhost:3001`
- Test consent flow
- Test banker login (use credentials from `Banker_Credentials.csv`)
- Test police login (use env credentials)

---

## Server Deployment

### Deployment Architecture

When deployed to production:
- **Frontend**: Hosted as static files on Vercel
- **Backend**: Serverless functions on Vercel
- **Database**: MongoDB Atlas (cloud)

### Deployment to Vercel

#### Prerequisites
1. Vercel account
2. MongoDB Atlas cluster
3. Vercel CLI installed: `npm i -g vercel`

#### Step 1: Configure MongoDB Atlas
1. Create MongoDB Atlas cluster
2. Whitelist Vercel IP (0.0.0.0/0 for all)
3. Create database user
4. Get connection string

#### Step 2: Set Vercel Environment Variables
```bash
# Navigate to project root
cd Cybersafety_consent_Deployed

# Login to Vercel
vercel login

# Set environment variables
vercel env add MONGODB_URI
# Paste your MongoDB connection string

vercel env add MANAGER_USER
# Enter manager username

vercel env add MANAGER_PASS
# Enter manager password

vercel env add JWT_SECRET
# Enter JWT secret (min 32 chars)

vercel env add POLICE_USERNAME
# Enter police username

vercel env add POLICE_PASSWORD
# Enter police password

vercel env add NODE_ENV
# Enter: production
```

#### Step 3: Deploy
```bash
# Deploy to production
vercel --prod

# Vercel will:
# 1. Build frontend (npm run build in /frontend)
# 2. Deploy backend as serverless functions
# 3. Return deployment URLs
```

#### Step 4: Update Frontend Environment
After backend deployment, update frontend `.env`:
```env
VITE_API_URL=https://your-backend-url.vercel.app
```

Redeploy frontend:
```bash
cd frontend
vercel --prod
```

### Alternative: Traditional Server Deployment

#### Using PM2 (Process Manager)

**Step 1: Install on Server**
```bash
# SSH into your server
ssh user@your-server-ip

# Install Node.js and PM2
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2

# Clone repository
git clone <repository-url>
cd Cybersafety_consent_Deployed
```

**Step 2: Setup Backend**
```bash
cd backend
npm install --production

# Create .env file
nano .env
# Add all environment variables
```

**Step 3: Setup Frontend**
```bash
cd ../frontend
npm install

# Update .env with server IP
nano .env
# VITE_API_URL=http://your-server-ip:5001

# Build for production
npm run build
```

**Step 4: Start with PM2**
```bash
# Start backend
cd ../backend
pm2 start api/index.js --name cybersafety-backend

# Serve frontend (using serve package)
npm install -g serve
cd ../frontend
pm2 start "serve dist -l 3001" --name cybersafety-frontend

# Save PM2 configuration
pm2 save
pm2 startup
```

**Step 5: Configure Nginx (Reverse Proxy)**
```nginx
# /etc/nginx/sites-available/cybersafety
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/cybersafety /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Docker Deployment

**`docker-compose.yml`** (create in root):
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5001:5001"
    environment:
      - MONGODB_URI=${MONGODB_URI}
      - JWT_SECRET=${JWT_SECRET}
      - MANAGER_USER=${MANAGER_USER}
      - MANAGER_PASS=${MANAGER_PASS}
      - POLICE_USERNAME=${POLICE_USERNAME}
      - POLICE_PASSWORD=${POLICE_PASSWORD}
      - NODE_ENV=production
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "3001:80"
    depends_on:
      - backend
    restart: unless-stopped
```

**Backend Dockerfile** (`/backend/Dockerfile`):
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5001
CMD ["node", "api/index.js"]
```

**Frontend Dockerfile** (`/frontend/Dockerfile`):
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Deploy with Docker**:
```bash
# Create .env file in root with all variables
docker-compose up -d
```

---

## API Documentation

### Base URLs
- **Development**: `http://localhost:5001`
- **Production**: `https://your-backend.vercel.app`

### Consent API

#### POST `/api/consent`
Submit a new consent record.

**Request**:
```json
{
  "name": "John Doe",
  "mobileNumber": "9876543210",
  "token": "ABC1234",
  "language": "en"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Consent record created successfully",
  "data": {
    "token": "ABC1234",
    "name": "John Doe",
    "mobileNumber": "9876543210",
    "language": "en",
    "consentGiven": false,
    "createdAt": "2026-01-06T10:30:00.000Z"
  }
}
```

#### POST `/api/consent/check`
Check if mobile number has existing record.

**Request**:
```json
{
  "mobileNumber": "9876543210"
}
```

**Response**:
```json
{
  "success": true,
  "exists": true,
  "data": {
    "token": "ABC1234",
    "name": "John Doe",
    "createdAt": "2026-01-06T10:30:00.000Z"
  }
}
```

### Banker API

#### POST `/api/banker/login`
Authenticate banker.

**Request**:
```json
{
  "ifscCode": "SBIN0001234",
  "password": "banker123"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "ifscCode": "SBIN0001234",
    "expiresIn": "8 hours"
  }
}
```

### Mule Account API

#### POST `/api/mule-account`
Add suspicious mule account (requires banker auth).

**Headers**:
```
Authorization: Bearer <banker_token>
```

**Request**:
```json
{
  "accountNumber": "123456789012",
  "accountOpeningDate": "2024-01-15",
  "accountHolderName": "Suspicious Person",
  "remarks": "Multiple high-value transactions",
  "bankName": "State Bank of India",
  "ifscCode": "SBIN0001234"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Mule account added successfully",
  "data": {
    "accountNumber": "123456789012",
    "addedBy": "SBIN0001234",
    "createdAt": "2026-01-06T10:30:00.000Z"
  }
}
```

#### GET `/api/mule-account`
Get all mule accounts (requires banker/police auth).

**Headers**:
```
Authorization: Bearer <token>
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "accountNumber": "123456789012",
      "accountHolderName": "Suspicious Person",
      "bankName": "State Bank of India",
      "addedBy": "SBIN0001234",
      "createdAt": "2026-01-06T10:30:00.000Z"
    }
  ]
}
```

### Police API

#### POST `/api/police/login`
Authenticate police officer.

**Request**:
```json
{
  "username": "police_user",
  "password": "police_pass"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "username": "police_user",
    "expiresIn": "8 hours"
  }
}
```

#### GET `/api/police/records`
Get all consent records (requires police auth).

**Headers**:
```
Authorization: Bearer <police_token>
```

**Response**:
```json
{
  "success": true,
  "count": 50,
  "data": [
    {
      "token": "ABC1234",
      "name": "John Doe",
      "mobileNumber": "9876543210",
      "language": "en",
      "consentGiven": true,
      "createdAt": "2026-01-06T10:30:00.000Z"
    }
  ]
}
```

#### POST `/api/police/search`
Search records by mobile number.

**Headers**:
```
Authorization: Bearer <police_token>
```

**Request**:
```json
{
  "mobileNumber": "9876543210"
}
```

### Manager API

#### POST `/api/manager/login`
Authenticate manager.

**Request**:
```json
{
  "username": "admin",
  "password": "admin123"
}
```

#### POST `/api/manager/search`
Search by token (requires manager auth).

**Headers**:
```
Authorization: Bearer <manager_token>
```

**Request**:
```json
{
  "token": "ABC1234"
}
```

### Police Analytics API

#### GET `/api/police/analytics/dashboard`
Get dashboard statistics.

**Headers**:
```
Authorization: Bearer <police_token>
```

**Response**:
```json
{
  "success": true,
  "data": {
    "totalConsents": 150,
    "totalMuleAccounts": 25,
    "consentsToday": 5,
    "muleAccountsToday": 2,
    "consentsByLanguage": {
      "en": 100,
      "te": 50
    },
    "recentActivity": [...]
  }
}
```

---

## Database Schema

### Collections

#### `consentrecords`
Stores victim consent information.

**Indexes**:
- `token` (unique)
- `mobileNumber` (unique)
- `createdAt`

**Validation**:
- Mobile number: 10 digits, starts with 6-9
- Token: 7 alphanumeric characters (uppercase)
- Language: 'en' or 'te'

#### `muleaccounts`
Stores suspicious bank accounts.

**Indexes**:
- `accountNumber`
- `ifscCode`
- `createdAt`

**Validation**:
- All fields required
- Account opening date cannot be in future

#### `bankers`
Stores banker authentication data.

**Indexes**:
- `ifscCode` (unique)

**Validation**:
- IFSC code format: XXXX0000000 (4 letters + 7 digits)

---

## Authentication & Security

### Authentication Methods

#### 1. Manager Authentication
- **Method**: JWT (JSON Web Tokens)
- **Credentials**: Environment variables (`MANAGER_USER`, `MANAGER_PASS`)
- **Token Expiry**: 8 hours
- **Middleware**: `auth.js`

#### 2. Banker Authentication
- **Method**: JWT + CSV-based credentials
- **Credentials**: `Banker_Credentials.csv` (IFSC → Password mapping)
- **Token Expiry**: 8 hours
- **Middleware**: `bankerAuth.js`

#### 3. Police Authentication
- **Method**: JWT
- **Credentials**: Environment variables (`POLICE_USERNAME`, `POLICE_PASSWORD`)
- **Token Expiry**: 8 hours
- **Middleware**: `policeAuth.js`

### Security Features

1. **CORS Configuration**:
   - Allows all origins (configurable)
   - Whitelist specific domains in production

2. **Input Validation**:
   - All inputs sanitized
   - Regex validation for mobile, IFSC, tokens
   - XSS protection

3. **Password Security**:
   - Bcrypt hashing (not implemented in banker.js yet)
   - Minimum password length

4. **JWT Security**:
   - Strong secret (min 32 chars)
   - Short expiry times
   - Stored securely (not in localStorage)

5. **Database Security**:
   - MongoDB connection string in env
   - Connection pooling
   - Prepared statements (Mongoose)

### Recommended Security Enhancements

**For Production**:
```javascript
// In backend/api/index.js
const allowedOrigins = [
  'https://your-frontend.vercel.app',
  'https://your-domain.com'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

---

## Configuration Files

### `/vercel.json` (Root)
Configures monorepo deployment to Vercel.

```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    },
    {
      "src": "backend/api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/backend/api/$1" },
    { "src": "/(.*)", "dest": "/frontend/$1" }
  ]
}
```

**Explanation**:
- **builds**: Defines build configurations for frontend (static) and backend (Node.js)
- **routes**: Routes `/api/*` to backend, everything else to frontend

### `/frontend/vite.config.js`
Configures Vite development server.

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true
      }
    }
  }
})
```

**Explanation**:
- **port**: Frontend dev server port
- **proxy**: Proxies `/api` requests to backend (avoids CORS in dev)

### `/backend/vercel.json`
Configures backend serverless deployment.

```json
{
  "version": 2,
  "builds": [
    { "src": "api/index.js", "use": "@vercel/node" }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "api/index.js",
      "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    }
  ]
}
```

### `/Banker_Credentials.csv`
Contains valid banker IFSC codes and passwords.

**Format**:
```csv
ifscCode,password
SBIN0001234,banker123
HDFC0002345,banker456
```

**Usage**:
- Loaded by `backend/config/bankerCredentials.js`
- Used for banker authentication
- Can be regenerated with `generateBankerCSV.js`

---

## Troubleshooting

### Common Issues

#### 1. Frontend can't connect to backend
**Symptom**: API calls fail with network errors

**Solutions**:
- Check `VITE_API_URL` in frontend `.env`
- Verify backend is running: `curl http://localhost:5001/api/health`
- Check CORS settings in backend
- Clear browser cache

#### 2. MongoDB connection fails
**Symptom**: "MONGODB_URI is not defined" or connection timeout

**Solutions**:
- Verify `MONGODB_URI` in environment variables
- Check MongoDB Atlas IP whitelist
- Test connection: `cd backend && node scripts/checkDatabase.js`
- Ensure correct username/password in connection string

#### 3. Banker login fails
**Symptom**: "Invalid IFSC code or password"

**Solutions**:
- Check `Banker_Credentials.csv` exists
- Verify IFSC code format (XXXX0001234)
- Regenerate credentials: `node generateBankerCSV.js`
- Check `backend/config/bankerCredentials.js` is loading CSV

#### 4. JWT authentication errors
**Symptom**: "Invalid token" or "Token expired"

**Solutions**:
- Verify `JWT_SECRET` is set (min 32 chars)
- Check token expiry time
- Clear tokens and re-login
- Verify middleware is applied to routes

#### 5. Vercel deployment fails
**Symptom**: Build errors or functions timeout

**Solutions**:
```bash
# Check build locally
cd frontend && npm run build
cd backend && node api/index.js

# Verify environment variables
vercel env ls

# Check Vercel logs
vercel logs <deployment-url>

# Redeploy
vercel --prod --force
```

#### 6. Speech recognition not working
**Symptom**: Voice input doesn't work

**Solutions**:
- Use Chrome, Edge, or Safari (Firefox not supported)
- Enable microphone permissions
- Use HTTPS (required for Web Speech API)
- Check browser console for errors

#### 7. Port already in use
**Symptom**: "EADDRINUSE: address already in use"

**Solutions**:
```bash
# Find process using port
lsof -i :3001  # or :5001

# Kill process
kill -9 <PID>

# Or change port in config
```

### Debug Commands

**Check backend health**:
```bash
curl http://localhost:5001/api/health
```

**Test consent API**:
```bash
curl -X POST http://localhost:5001/api/consent/check \
  -H "Content-Type: application/json" \
  -d '{"mobileNumber":"9876543210"}'
```

**Check database connection**:
```bash
cd backend
node scripts/checkDatabase.js
```

**View backend logs (PM2)**:
```bash
pm2 logs cybersafety-backend
```

**View Vercel logs**:
```bash
vercel logs --follow
```

### Performance Optimization

#### Frontend
```javascript
// Lazy load routes in App.jsx
const BankerDashboard = lazy(() => import('./pages/BankerDashboardPage'));

<Suspense fallback={<div>Loading...</div>}>
  <Route path="/banker/dashboard" element={<BankerDashboard />} />
</Suspense>
```

#### Backend
```javascript
// Add Redis caching for frequently accessed data
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

// Cache consent records
router.get('/records', async (req, res) => {
  const cached = await redis.get('all_records');
  if (cached) return res.json(JSON.parse(cached));
  
  const records = await ConsentRecord.find();
  await redis.set('all_records', JSON.stringify(records), 'EX', 300);
  res.json(records);
});
```

---

## Maintenance & Updates

### Regular Maintenance Tasks

1. **Database Cleanup**:
```javascript
// Remove old consent records (if needed)
// backend/scripts/cleanupOldRecords.js
const cutoffDate = new Date();
cutoffDate.setMonth(cutoffDate.getMonth() - 6);

await ConsentRecord.deleteMany({
  createdAt: { $lt: cutoffDate },
  consentGiven: false
});
```

2. **Update Dependencies**:
```bash
# Check for updates
npm outdated

# Update packages
npm update

# Update major versions
npx npm-check-updates -u
npm install
```

3. **Backup Database**:
```bash
# MongoDB Atlas automated backups enabled
# Or manual backup:
mongodump --uri="mongodb+srv://..." --out=backup/
```

4. **Monitor Logs**:
```bash
# Vercel logs
vercel logs --follow

# PM2 logs
pm2 logs
```

### Adding New Features

**Example: Add new consent statement**

1. Update `frontend/src/config/statements.js`:
```javascript
export const statements = {
  en: [
    "Statement 1...",
    "Statement 2...",
    "NEW STATEMENT HERE"  // Add new statement
  ],
  te: [
    "వాక్యం 1...",
    "వాక్యం 2...",
    "కొత్త వాక్యం"  // Telugu version
  ]
};
```

2. No backend changes needed
3. Test in dev environment
4. Deploy: `vercel --prod`

**Example: Add new API endpoint**

1. Create route in `backend/api/routes/`:
```javascript
// newFeature.js
router.get('/feature', authenticatePolice, async (req, res) => {
  // Implementation
});
```

2. Register in `backend/api/index.js`:
```javascript
import newFeatureRoutes from './routes/newFeature.js';
app.use('/api/new-feature', newFeatureRoutes);
```

3. Update frontend service
4. Test and deploy

---

## Quick Reference

### Ports
- **Frontend Dev**: 3001
- **Backend Dev**: 5001
- **MongoDB**: 27017 (local) or Atlas (cloud)

### Key Commands

| Task | Command |
|------|---------|
| Start backend dev | `cd backend && npm run dev` |
| Start frontend dev | `cd frontend && npm run dev` |
| Build frontend | `cd frontend && npm run build` |
| Generate banker CSV | `node generateBankerCSV.js` |
| Check database | `cd backend && node scripts/checkDatabase.js` |
| Deploy to Vercel | `vercel --prod` |
| View logs (PM2) | `pm2 logs` |
| View logs (Vercel) | `vercel logs --follow` |

### Important File Locations

| File | Purpose |
|------|---------|
| `/frontend/.env` | Frontend environment variables |
| `/backend/.env` | Backend environment variables |
| `/Banker_Credentials.csv` | Banker login credentials |
| `/frontend/src/config/constants.js` | App configuration |
| `/backend/api/index.js` | Main server file |
| `/vercel.json` | Deployment configuration |

### Default Credentials (Development)

**Manager**:
- Username: (from `MANAGER_USER`)
- Password: (from `MANAGER_PASS`)

**Police**:
- Username: (from `POLICE_USERNAME`)
- Password: (from `POLICE_PASSWORD`)

**Banker**:
- See `Banker_Credentials.csv` for IFSC codes and passwords

---

## Support & Contact

**Developer**: Nimmagadda Sampreeth Chowdary

For issues or questions:
1. Check this guide
2. Review error logs
3. Check documentation files in project root
4. Contact system administrator

---

## License & Credits

**CyberSuraksha Consent System**
Version 1.0.0
© 2026 Nimmagadda Sampreeth Chowdary

Built with:
- React, Vite, Express, MongoDB
- Google Gemini AI
- Web Speech API
- Vercel Platform

---

## Appendix

### A. Environment Variable Template

**Complete `.env` for Backend**:
```env
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/cybersafety?retryWrites=true&w=majority

# Authentication
MANAGER_USER=admin
MANAGER_PASS=secure_password_123
POLICE_USERNAME=police_officer
POLICE_PASSWORD=police_secure_123
JWT_SECRET=your_very_long_and_secure_jwt_secret_key_minimum_32_characters_12345

# Server
NODE_ENV=production
PORT=5001
```

**Complete `.env` for Frontend**:
```env
VITE_API_URL=https://your-backend.vercel.app
VITE_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### B. Nginx Full Configuration

```nginx
server {
    listen 80;
    server_name cybersafety.example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name cybersafety.example.com;

    ssl_certificate /etc/letsencrypt/live/cybersafety.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cybersafety.example.com/privkey.pem;

    # Frontend
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # CORS headers
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization' always;
        
        if ($request_method = 'OPTIONS') {
            return 204;
        }
    }
}
```

### C. SSL Setup with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d cybersafety.example.com

# Auto-renewal (add to crontab)
0 3 * * * certbot renew --quiet
```

### D. Monitoring Setup

**Install monitoring tools**:
```bash
# PM2 monitoring
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M

# System monitoring
sudo apt install htop iotop nethogs
```

**Setup alerts**:
```bash
# PM2 email notifications
pm2 install pm2-slack
pm2 set pm2-slack:slack_url https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

---

**End of Guide**

This guide should be kept updated as the application evolves. Last updated: January 6, 2026.
