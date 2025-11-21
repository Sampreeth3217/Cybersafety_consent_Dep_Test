# Cybersafety Consent Web Application

A bilingual (English + Telugu) consent-form web application for bank customers attempting transactions. The application uses speech recognition to ensure users explicitly read key cyber-safety statements out loud before proceeding with their transactions.

## 🌟 Features

- **Bilingual Support**: Full support for English and Telugu languages
- **Speech Recognition**: Uses Web Speech API to verify users read statements aloud
- **Token Generation**: Generates unique 7-character alphanumeric reference codes
- **Manager Dashboard**: Hidden admin interface for searching and verifying consent records
- **Fully Responsive**: Mobile-first design that works on all devices
- **Secure**: JWT authentication, input validation, and environment-based secrets
- **Modern Stack**: React + Vite frontend, Node.js + Express backend, MongoDB database

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Browser Compatibility](#browser-compatibility)
- [Security](#security)
- [License](#license)

## 🛠 Tech Stack

### Frontend

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router 6** - Client-side routing
- **Axios** - HTTP client
- **Web Speech API** - Speech recognition

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB Atlas** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Deployment

- **Vercel** - Hosting platform (frontend + serverless backend)

## 📁 Project Structure

```
cybersafety-consent-app/
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── LanguageSelector.jsx
│   │   │   ├── NameInputForm.jsx
│   │   │   ├── StatementReader.jsx
│   │   │   ├── SpeechStatusIndicator.jsx
│   │   │   ├── ManagerLoginForm.jsx
│   │   │   ├── ManagerSearchForm.jsx
│   │   │   └── ConsentRecordDisplay.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── ConsentFlowPage.jsx
│   │   │   ├── ConfirmationPage.jsx
│   │   │   ├── ManagerLoginPage.jsx
│   │   │   └── ManagerDashboardPage.jsx
│   │   ├── services/          # API and utilities
│   │   │   ├── apiClient.js
│   │   │   └── speechRecognition.js
│   │   ├── config/            # Configuration files
│   │   │   ├── statements.js
│   │   │   └── constants.js
│   │   ├── utils/             # Helper functions
│   │   │   └── helpers.js
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/
│   ├── api/
│   │   ├── routes/
│   │   │   ├── consent.js     # Consent endpoints
│   │   │   └── manager.js     # Manager endpoints
│   │   └── index.js           # Express app
│   ├── models/
│   │   └── ConsentRecord.js   # Mongoose schema
│   ├── config/
│   │   └── database.js        # MongoDB connection
│   ├── middleware/
│   │   └── auth.js            # JWT authentication
│   ├── utils/
│   │   └── validators.js      # Input validation
│   └── package.json
├── .env.example               # Environment variables template
├── vercel.json                # Vercel deployment config
└── README.md                  # This file
```

## ✅ Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **MongoDB Atlas** account (free tier works fine)
- **Modern browser** with Web Speech API support (Chrome, Edge, Safari)

## 📦 Installation

### 1. Clone the repository

```powershell
git clone <repository-url>
cd Cybersafety_consent_v1
```

### 2. Install all dependencies

```powershell
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Return to root
cd ..
```

Or use the convenience script:

```powershell
npm run install:all
```

## ⚙️ Configuration

### 1. Create environment file

Copy the example environment file and configure it:

```powershell
Copy-Item .env.example .env
```

### 2. Configure environment variables

Edit `.env` with your settings:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cybersafety?retryWrites=true&w=majority

# Manager Authentication
MANAGER_USER=admin
MANAGER_PASS=your_secure_password_here

# JWT Secret (generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters

# Node Environment
NODE_ENV=development
```

### 3. MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and update `MONGODB_URI` in `.env`

## 🚀 Running Locally

### Option 1: Run everything together

```powershell
npm run dev
```

This will start both frontend (port 3000) and backend (port 5000) concurrently.

### Option 2: Run separately

**Terminal 1 - Backend:**

```powershell
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```powershell
cd frontend
npm run dev
```

### Access the application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Manager Login**: http://localhost:3000/manager (hidden route)

## 🌐 Deployment

### Deploy to Vercel

1. **Install Vercel CLI** (optional):

```powershell
npm install -g vercel
```

2. **Configure Vercel Environment Variables**:

Go to your Vercel project settings and add:

- `MONGODB_URI`
- `MANAGER_USER`
- `MANAGER_PASS`
- `JWT_SECRET`

3. **Deploy**:

```powershell
# Link your project (first time only)
vercel link

# Deploy
vercel --prod
```

Or use the Vercel dashboard:

1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically on push to main branch

### Build for Production

```powershell
# Build frontend
cd frontend
npm run build

# The dist/ folder contains production-ready files
```

## 📚 API Documentation

### Public Endpoints

#### POST `/api/consent`

Submit a new consent record.

**Request Body:**

```json
{
  "name": "John Doe",
  "token": "A9X2KQ7",
  "language": "en"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Consent record created successfully",
  "data": {
    "id": "...",
    "token": "A9X2KQ7",
    "name": "John Doe",
    "language": "en",
    "createdAt": "2025-11-20T10:30:00.000Z"
  }
}
```

### Manager Endpoints

#### POST `/api/manager/login`

Authenticate manager.

**Request Body:**

```json
{
  "username": "admin",
  "password": "password"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here"
}
```

#### GET `/api/manager/consent/:token`

Search for consent record by token (requires authentication).

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "success": true,
  "data": {
    "name": "John Doe",
    "token": "A9X2KQ7",
    "language": "English",
    "languageCode": "en",
    "createdAt": "2025-11-20T10:30:00.000Z"
  }
}
```

## 🌐 Browser Compatibility

The Web Speech API is required for speech recognition functionality:

| Browser | Support    | Notes          |
| ------- | ---------- | -------------- |
| Chrome  | ✅ Full    | Recommended    |
| Edge    | ✅ Full    | Recommended    |
| Safari  | ⚠️ Partial | iOS 14.5+      |
| Firefox | ❌ No      | Not supported  |
| Opera   | ✅ Full    | Chromium-based |

**Note**: Users on unsupported browsers will see an error message explaining the requirement.

## 🔒 Security

### Implemented Security Measures

1. **Authentication**: JWT-based authentication for manager routes
2. **Input Validation**: Server-side validation for all inputs
3. **Environment Variables**: Sensitive data stored in environment variables
4. **HTTPS**: Enforced in production via Vercel
5. **CORS**: Configured to allow only trusted origins
6. **Rate Limiting**: Consider adding rate limiting for production
7. **SQL Injection**: Protected by Mongoose ODM
8. **XSS**: React automatically escapes output

### Recommendations for Production

1. Use strong passwords for `MANAGER_PASS`
2. Generate a secure random string for `JWT_SECRET` (minimum 32 characters)
3. Enable MongoDB IP whitelisting
4. Implement rate limiting on API endpoints
5. Add request logging and monitoring
6. Set up SSL/TLS certificates
7. Regular security audits

## 🎯 User Flow

### Customer Flow

1. **Landing Page**: Select language (English/Telugu)
2. **Name Entry**: Enter full name
3. **Token Generation**: System generates unique 7-character token
4. **Statement Reading**: Read each statement aloud using microphone
5. **Speech Verification**: System validates spoken text matches statement
6. **Submission**: After all statements, consent is submitted to database
7. **Confirmation**: Display token for bank staff verification

### Manager Flow

1. **Hidden Access**: Navigate to `/manager` (not publicly linked)
2. **Login**: Authenticate with username/password
3. **Dashboard**: Search for consent records by token
4. **Verification**: View customer details and timestamp

## 🐛 Troubleshooting

### Microphone not working

- Check browser permissions (allow microphone access)
- Ensure HTTPS (Web Speech API requires secure context)
- Try a supported browser (Chrome/Edge recommended)

### MongoDB connection fails

- Verify `MONGODB_URI` is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user has proper permissions

### Frontend can't reach backend

- Verify backend is running on port 5000
- Check CORS configuration in `backend/api/index.js`
- Ensure proxy is configured in `frontend/vite.config.js`

### Speech recognition not accurate

- Adjust `SIMILARITY_THRESHOLD` in `frontend/src/config/constants.js`
- Speak clearly and at moderate pace
- Reduce background noise

## 📝 License

This project is licensed under the MIT License.

## 👥 Support

For issues or questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review the API documentation
3. Contact the development team

## 🎉 Acknowledgments

- Web Speech API for speech recognition
- MongoDB Atlas for database hosting
- Vercel for deployment platform
- React community for excellent tooling

---

Built with ❤️ for enhanced banking security
