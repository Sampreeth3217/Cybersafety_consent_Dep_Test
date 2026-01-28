# Complete File Structure

This document shows the complete file structure of the Cybersafety Consent Application.
**Last Updated**: January 6, 2026

```
Cybersafety_consent_Deployed/
│
├── 📄 COMPLETE_APPLICATION_GUIDE.md      # Comprehensive deployment & maintenance guide
├── 📄 FILE_STRUCTURE.md                  # This file - project structure documentation
├── 📄 Banker_Credentials.csv             # Banker IFSC codes and passwords
├── 📄 generateBankerCSV.js               # Script to generate banker credentials
│
├── 📄 package.json                       # Root package with workspace scripts
├── 📄 .gitignore                         # Git ignore rules
├── 📄 vercel.json                        # Vercel monorepo deployment configuration
│
├── 📁 frontend/                          # React + Vite frontend application
│   ├── 📄 package.json                   # Frontend dependencies
│   ├── 📄 vite.config.js                 # Vite configuration (dev port: 3001)
│   ├── 📄 vercel.json                    # Frontend Vercel build config
│   ├── 📄 index.html                     # HTML entry point
│   ├── 📄 .env                           # Frontend environment variables
│   │
│   ├── 📁 public/                        # Static assets
│   │   ├── 📄 CompoundLogo.png           # Application compound logo
│   │   ├── 📄 CyberSurakshaLogo.png      # Main app logo
│   │   ├── 📄 Hero_Section.jpg           # Hero section background
│   │   ├── 📄 ap-police-logo.png         # Andhra Pradesh Police logo
│   │   ├── 📄 sebi.png                   # SEBI logo
│   │   ├── 📁 audio/                     # Audio files directory
│   │   │   └── 📄 README.md              # Audio files documentation
│   │   ├── 📁 english/                   # English audio files
│   │   └── 📁 telugu/                    # Telugu audio files
│   │
│   └── 📁 src/                           # Source code
│       ├── 📄 main.jsx                   # Application entry point
│       ├── 📄 App.jsx                    # Main app component with routing
│       ├── 📄 App.css                    # App-level styles
│       ├── 📄 index.css                  # Global styles and CSS variables
│       │
│       ├── 📁 components/                # Reusable UI components
│       │   ├── 📄 AIChatbot.jsx                  # Gemini AI chatbot integration
│       │   ├── 📄 AIChatbot.css
│       │   ├── 📄 LanguageSelector.jsx           # Language selection component
│       │   ├── 📄 LanguageSelector.css
│       │   ├── 📄 NameInputForm.jsx              # Name and mobile input form
│       │   ├── 📄 NameInputForm.css
│       │   ├── 📄 StatementReader.jsx            # Statement display and reading
│       │   ├── 📄 StatementReader.css
│       │   ├── 📄 SpeechStatusIndicator.jsx      # Visual speech feedback
│       │   ├── 📄 SpeechStatusIndicator.css
│       │   ├── 📄 ManagerLoginForm.jsx           # Manager login form
│       │   ├── 📄 ManagerLoginForm.css
│       │   ├── 📄 ManagerSearchForm.jsx          # Token search form
│       │   ├── 📄 ManagerSearchForm.css
│       │   ├── 📄 ConsentRecordDisplay.jsx       # Record display component
│       │   └── 📄 ConsentRecordDisplay.css
│       │
│       ├── 📁 pages/                     # Page components (all user interfaces)
│       │   ├── 📄 MainLandingPage.jsx            # Main entry page with role selection
│       │   ├── 📄 MainLandingPage.css
│       │   ├── 📄 LandingPage.jsx                # Consent app landing page
│       │   ├── 📄 LandingPage.css
│       │   ├── 📄 CybersafetyConsentPage.jsx     # Cybersafety information page
│       │   ├── 📄 CybersafetyConsentPage.css
│       │   ├── 📄 ConsentFlowPage.jsx            # Voice consent recording flow
│       │   ├── 📄 ConsentFlowPage.css
│       │   ├── 📄 ConfirmationPage.jsx           # Completion page with token display
│       │   ├── 📄 ConfirmationPage.css
│       │   │
│       │   ├── 📄 CybercrimeCategoryPage.jsx     # Cybercrime categories listing
│       │   ├── 📄 CybercrimeCategoryPage.css
│       │   ├── 📄 CybercrimeDetailPage.jsx       # Detailed cybercrime info
│       │   ├── 📄 CybercrimeDetailPage.css
│       │   │
│       │   ├── 📄 BankerLoginPage.jsx            # Banker authentication
│       │   ├── 📄 BankerLoginPage.css
│       │   ├── 📄 BankerDashboardPage.jsx        # Banker home dashboard
│       │   ├── 📄 BankerDashboardPage.css
│       │   ├── 📄 AddMuleAccountPage.jsx         # Add suspicious mule account
│       │   ├── 📄 AddMuleAccountPage.css
│       │   ├── 📄 ViewMuleAccountsPage.jsx       # View reported mule accounts
│       │   ├── 📄 ViewMuleAccountsPage.css
│       │   │
│       │   ├── 📄 PoliceLoginPage.jsx            # Police authentication
│       │   ├── 📄 PoliceLoginPage.css
│       │   ├── 📄 PoliceDashboardPage.jsx        # Police dashboard with analytics
│       │   ├── 📄 PoliceDashboardPage.css
│       │   ├── 📄 PoliceAllRecordsPage.jsx       # View all consent records
│       │   ├── 📄 PoliceAllRecordsPage.css
│       │   ├── 📄 PoliceMuleAccountsPage.jsx     # View all mule accounts
│       │   ├── 📄 PoliceMuleAccountsPage.css
│       │   │
│       │   ├── 📄 ManagerLoginPage.jsx           # Manager authentication
│       │   ├── 📄 ManagerLoginPage.css
│       │   ├── 📄 ManagerDashboardPage.jsx       # Manager search & view
│       │   └── 📄 ManagerDashboardPage.css
│       │
│       ├── 📁 services/                  # API and service utilities
│       │   ├── 📄 apiClient.js                   # Axios wrapper with interceptors
│       │   └── 📄 speechRecognition.js           # Web Speech API utilities
│       │
│       ├── 📁 config/                    # Configuration files
│       │   ├── 📄 statements.js                  # Bilingual consent statements
│       │   └── 📄 constants.js                   # App constants, routes, configs
│       │
│       └── 📁 utils/                     # Helper functions
│           └── 📄 helpers.js                     # Utility functions (if exists)
│
└── 📁 backend/                           # Node.js + Express backend
    ├── 📄 package.json                   # Backend dependencies
    ├── 📄 vercel.json                    # Backend Vercel serverless config
    │
    ├── 📁 api/                           # API routes and server
    │   ├── 📄 index.js                   # Express app and server setup (port: 5001)
    │   │
    │   └── 📁 routes/                    # API route handlers
    │       ├── 📄 consent.js             # Consent submission & check endpoints
    │       ├── 📄 manager.js             # Manager authentication & search
    │       ├── 📄 banker.js               # Banker authentication & profile
    │       ├── 📄 muleAccount.js          # Mule account CRUD operations
    │       ├── 📄 police.js               # Police authentication & record access
    │       └── 📄 policeAnalytics.js      # Police dashboard analytics & stats
    │
    ├── 📁 models/                        # Database models (Mongoose schemas)
    │   ├── 📄 ConsentRecord.js           # Consent record schema
    │   ├── 📄 MuleAccount.js             # Mule account schema
    │   └── 📄 Banker.js                  # Banker authentication schema
    │
    ├── 📁 config/                        # Backend configuration
    │   ├── 📄 database.js                # MongoDB connection with pooling
    │   └── 📄 bankerCredentials.js       # Banker CSV credentials loader
    │
    ├── 📁 middleware/                    # Express middleware
    │   ├── 📄 auth.js                    # Manager JWT authentication
    │   ├── 📄 bankerAuth.js              # Banker JWT authentication
    │   └── 📄 policeAuth.js              # Police JWT authentication
    │
    ├── 📁 utils/                         # Backend utilities
    │   └── 📄 validators.js              # Input validation & sanitization
    │
    └── 📁 scripts/                       # Utility scripts
        ├── 📄 generateBankerCredentials.js   # Generate banker CSV
        ├── 📄 addTestConsentRecords.js       # Seed test data
        ├── 📄 checkDatabase.js               # Verify DB connectivity
        ├── 📄 banker_credentials.csv         # Generated credentials CSV
        └── 📄 banker_credentials.json        # Generated credentials JSON
```

## Component Descriptions

### Frontend Components

| Component               | Purpose                        | Key Features                        |
| ----------------------- | ------------------------------ | ----------------------------------- |
| `AIChatbot`             | AI-powered assistance          | Gemini AI integration, context help |
| `LanguageSelector`      | Language selection UI          | Bilingual display, visual selection |
| `NameInputForm`         | User name & mobile input       | Validation, error handling          |
| `StatementReader`       | Statement display and speech   | Speech recognition, validation      |
| `SpeechStatusIndicator` | Visual feedback                | Animated status, progress display   |
| `ManagerLoginForm`      | Admin authentication           | Secure login, error handling        |
| `ManagerSearchForm`     | Token search interface         | Input validation, search function   |
| `ConsentRecordDisplay`  | Record details display         | Formatted data, close action        |

### Frontend Pages

| Page                      | Route                                    | Purpose                                   |
| ------------------------- | ---------------------------------------- | ----------------------------------------- |
| `MainLandingPage`         | `/`                                      | Main entry with role selection            |
| `LandingPage`             | `/landing`                               | Consent app entry                         |
| `CybersafetyConsentPage`  | `/cybersuraksha`                         | Cybersafety information & education       |
| `ConsentFlowPage`         | `/cybersuraksha/flow`                    | Voice consent recording flow              |
| `ConfirmationPage`        | `/cybersuraksha/confirmation`            | Display completion token                  |
| `CybercrimeCategoryPage`  | `/cybercrime/*`                          | Cybercrime categories listing             |
| `CybercrimeDetailPage`    | `/cybercrime/[category]`                 | Detailed cybercrime information           |
| `BankerLoginPage`         | `/cybersuraksha/banker`                  | Banker authentication                     |
| `BankerDashboardPage`     | `/cybersuraksha/banker/dashboard`        | Banker home screen                        |
| `AddMuleAccountPage`      | `/cybersuraksha/banker/add-mule-account` | Add suspicious mule accounts              |
| `ViewMuleAccountsPage`    | `/cybersuraksha/banker/view-mule-accounts` | View reported mule accounts            |
| `PoliceLoginPage`         | `/cybersuraksha/police`                  | Police authentication                     |
| `PoliceDashboardPage`     | `/cybersuraksha/police/dashboard`        | Police analytics dashboard                |
| `PoliceAllRecordsPage`    | `/cybersuraksha/police/all-records`      | View all consent records                  |
| `PoliceMuleAccountsPage`  | `/cybersuraksha/police/mule-accounts`    | View all mule accounts                    |
| `ManagerLoginPage`        | `/cybersuraksha/manager`                 | Manager authentication (hidden)           |
| `ManagerDashboardPage`    | `/cybersuraksha/manager/dashboard`       | Manager search & view interface           |

### Backend Routes

| Method | Endpoint                           | Purpose                         | Auth     |
| ------ | ---------------------------------- | ------------------------------- | -------- |
| GET    | `/api/health`                      | Health check                    | No       |
| POST   | `/api/consent`                     | Create consent record           | No       |
| POST   | `/api/consent/check`               | Check existing record by mobile | No       |
| POST   | `/api/manager/login`               | Manager authentication          | No       |
| GET    | `/api/manager/consent/:token`      | Search by token                 | Manager  |
| GET    | `/api/manager/verify`              | Verify JWT token                | Manager  |
| POST   | `/api/banker/login`                | Banker authentication           | No       |
| GET    | `/api/banker/profile`              | Get banker profile              | Banker   |
| POST   | `/api/mule-account`                | Add mule account                | Banker   |
| GET    | `/api/mule-account`                | Get all mule accounts           | Banker/Police |
| DELETE | `/api/mule-account/:id`            | Delete mule account             | Banker   |
| POST   | `/api/police/login`                | Police authentication           | No       |
| GET    | `/api/police/records`              | Get all consent records         | Police   |
| POST   | `/api/police/search`               | Search by mobile number         | Police   |
| GET    | `/api/police/analytics/dashboard`  | Get dashboard statistics        | Police   |
| GET    | `/api/police/analytics/recent`     | Get recent activity             | Police   |

## Key Files Explained

### Root Level Configuration

- **`vercel.json`**: Monorepo deployment configuration for Vercel (routes frontend & backend)
- **`package.json`**: Root package with workspace scripts
- **`generateBankerCSV.js`**: Utility to generate banker credentials from IFSC codes
- **`Banker_Credentials.csv`**: Database of valid IFSC codes and passwords for banker login
- **`.gitignore`**: Specifies files to exclude from Git (node_modules, .env, etc.)

### Frontend Configuration

- **`vite.config.js`**: Vite dev server (port 3001) and build configuration with API proxy
- **`vercel.json`**: Frontend static build configuration for Vercel
- **`index.html`**: HTML entry point with root div and script tag
- **`.env`**: Environment variables (VITE_API_URL, VITE_GEMINI_API_KEY)

### Frontend Data Files

- **`statements.js`**: 13+ cybersafety consent statements in English and Telugu
- **`constants.js`**: Routes, API base URL, speech config, similarity threshold, error messages

### Frontend Service Files

- **`apiClient.js`**: Centralized Axios HTTP client with interceptors and auth headers
- **`speechRecognition.js`**: Web Speech API wrapper with similarity checking algorithm
- **`helpers.js`**: Utility functions (token generation, date formatting, validation)

### Backend Core Files

- **`api/index.js`**: Main Express server setup, middleware, CORS, error handling, exports for Vercel
- **`vercel.json`**: Backend serverless function configuration
- **`database.js`**: MongoDB connection with pooling for serverless, connection reuse
- **`bankerCredentials.js`**: Loads and validates banker credentials from CSV file

### Backend Authentication

- **`auth.js`**: Manager JWT token generation and verification middleware
- **`bankerAuth.js`**: Banker JWT authentication and token management
- **`policeAuth.js`**: Police JWT authentication and credential validation
- **`validators.js`**: Input validation, sanitization, token format validation

### Database Schemas

**`ConsentRecord.js`**:
- Fields: name, mobileNumber, token (unique), language, consentGiven, timestamps
- Validation: Indian mobile format, 7-char alphanumeric token, enum language
- Indexes: token, mobileNumber (both unique)

**`MuleAccount.js`**:
- Fields: accountNumber, accountHolderName, accountOpeningDate, remarks, addedBy (IFSC), bankName
- Validation: Required fields, date validation
- Indexes: accountNumber, ifscCode, createdAt

**`Banker.js`**:
- Fields: ifscCode (unique), password (hashed), lastLogin, createdAt
- Validation: IFSC format validation
- Indexes: ifscCode (unique)

## File Count Summary

| Type           | Count  |
| -------------- | ------ |
| JavaScript/JSX | 60+    |
| CSS            | 30+    |
| JSON           | 6      |
| CSV            | 2      |
| Markdown       | 2      |
| Config         | 4      |
| Images/Assets  | 5      |
| **Total**      | **109+** |

## Lines of Code (Approximate)

| Category              | Lines      |
| --------------------- | ---------- |
| Frontend Components   | ~2,000     |
| Frontend Pages        | ~4,500     |
| Frontend Services     | ~800       |
| Backend API Routes    | ~1,800     |
| Backend Models        | ~400       |
| Backend Middleware    | ~600       |
| CSS Styling           | ~3,500     |
| Documentation         | ~3,500     |
| **Total**             | **~17,100** |

## Import Relationships

### Frontend Component Flow

```
main.jsx
  └── App.jsx
      ├── MainLandingPage.jsx (entry point)
      │
      ├── LandingPage.jsx
      │   ├── LanguageSelector.jsx
      │   └── NameInputForm.jsx
      │
      ├── CybersafetyConsentPage.jsx
      │   └── AIChatbot.jsx
      │
      ├── ConsentFlowPage.jsx
      │   ├── StatementReader.jsx
      │   └── SpeechStatusIndicator.jsx
      │
      ├── ConfirmationPage.jsx
      │
      ├── CybercrimeCategoryPage.jsx
      │   └── CybercrimeDetailPage.jsx
      │
      ├── BankerLoginPage.jsx
      ├── BankerDashboardPage.jsx
      ├── AddMuleAccountPage.jsx
      ├── ViewMuleAccountsPage.jsx
      │
      ├── PoliceLoginPage.jsx
      ├── PoliceDashboardPage.jsx
      ├── PoliceAllRecordsPage.jsx
      ├── PoliceMuleAccountsPage.jsx
      │
      ├── ManagerLoginPage.jsx
      │   └── ManagerLoginForm.jsx
      └── ManagerDashboardPage.jsx
          ├── ManagerSearchForm.jsx
          └── ConsentRecordDisplay.jsx
```

### Backend Route Flow

```
api/index.js (main server)
  ├── routes/consent.js
  │   ├── models/ConsentRecord.js
  │   └── utils/validators.js
  │
  ├── routes/manager.js
  │   ├── models/ConsentRecord.js
  │   ├── middleware/auth.js
  │   └── utils/validators.js
  │
  ├── routes/banker.js
  │   ├── models/Banker.js
  │   ├── config/bankerCredentials.js
  │   └── middleware/bankerAuth.js
  │
  ├── routes/muleAccount.js
  │   ├── models/MuleAccount.js
  │   └── middleware/bankerAuth.js, policeAuth.js
  │
  ├── routes/police.js
  │   ├── models/ConsentRecord.js
  │   └── middleware/policeAuth.js
  │
  ├── routes/policeAnalytics.js
  │   ├── models/ConsentRecord.js, MuleAccount.js
  │   └── middleware/policeAuth.js
  │
  └── config/database.js (MongoDB connection)
```

## Asset Dependencies

### External Dependencies

**Frontend (from package.json):**
- `react`, `react-dom` (UI framework)
- `react-router-dom` (client-side routing)
- `axios` (HTTP client)
- `@google/generative-ai` (Gemini AI chatbot)
- `vite` (build tool & dev server)
- `@vitejs/plugin-react` (React support for Vite)

**Backend (from package.json):**
- `express` (web framework)
- `mongoose` (MongoDB ODM)
- `jsonwebtoken` (JWT auth)
- `cors` (CORS handling)
- `dotenv` (environment variables)
- `bcryptjs` (password hashing)
- `nodemon` (dev server auto-restart)

**Total npm packages**: ~150+ (including sub-dependencies)

### Environment Variables Required

**Frontend (.env):**
```
VITE_API_URL=https://backend-url.vercel.app
VITE_GEMINI_API_KEY=your_gemini_api_key
```

**Backend (Environment/Vercel):**
```
MONGODB_URI=mongodb+srv://...
MANAGER_USER=admin_username
MANAGER_PASS=admin_password
JWT_SECRET=secret_key_min_32_chars
POLICE_USERNAME=police_user
POLICE_PASSWORD=police_pass
NODE_ENV=production
PORT=5001
```

## File Size Estimates

| Category         | Size       |
| ---------------- | ---------- |
| Source Code      | ~500 KB    |
| Frontend Assets  | ~5 MB      |
| node_modules     | ~500 MB    |
| Built Frontend   | ~800 KB    |
| Documentation    | ~300 KB    |
| Database Backups | Varies     |

## Development Ports

| Service              | Port | Access URL                    |
| -------------------- | ---- | ----------------------------- |
| Frontend Dev Server  | 3001 | http://localhost:3001         |
| Backend API Server   | 5001 | http://localhost:5001         |
| MongoDB (Local)      | 27017| mongodb://localhost:27017     |
| MongoDB Atlas (Prod) | -    | Cloud hosted                  |

## Build Output

After running `npm run build` in frontend:

```
frontend/dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other hashed assets]
└── vite.svg
```

## Deployment Structure (Vercel)

```
Vercel Production Deployment:
│
├── Frontend (Static Site)
│   ├── Deployed from: frontend/dist/
│   ├── Build command: npm run build
│   ├── Output: Static HTML, CSS, JS
│   └── Domain: https://your-frontend.vercel.app
│
└── Backend (Serverless Functions)
    ├── Each route → Separate serverless function
    ├── Functions auto-scale
    ├── Domain: https://your-backend.vercel.app
    │
    └── API Endpoints:
        ├── /api/consent
        ├── /api/manager/*
        ├── /api/banker/*
        ├── /api/mule-account/*
        ├── /api/police/*
        └── /api/police/analytics/*
```

## Build Output Structure

After running `npm run build` in frontend:

```
frontend/dist/
├── index.html (with asset links)
├── assets/
│   ├── index-[hash].js (minified React app)
│   ├── index-[hash].css (compiled styles)
│   └── [other-assets]-[hash].{js,css,png,jpg}
├── CompoundLogo.png
├── CyberSurakshaLogo.png
├── Hero_Section.jpg
├── ap-police-logo.png
└── sebi.png
```

---

## Database Collections

### MongoDB Collections in Production

1. **consentrecords**
   - Purpose: Store victim consent information
   - Indexes: token (unique), mobileNumber (unique), createdAt
   - Avg Document Size: ~200 bytes

2. **muleaccounts**
   - Purpose: Store suspicious bank account reports
   - Indexes: accountNumber, ifscCode, createdAt
   - Avg Document Size: ~300 bytes

3. **bankers**
   - Purpose: Store banker authentication data
   - Indexes: ifscCode (unique)
   - Avg Document Size: ~150 bytes

---

## User Roles & Access Matrix

| Feature                  | Public | Banker | Police | Manager |
| ------------------------ | ------ | ------ | ------ | ------- |
| Submit Consent           | ✅     | ❌     | ❌     | ❌      |
| View Own Consent Token   | ✅     | ❌     | ❌     | ❌      |
| Add Mule Accounts        | ❌     | ✅     | ❌     | ❌      |
| View Own Mule Accounts   | ❌     | ✅     | ❌     | ❌      |
| View All Consent Records | ❌     | ❌     | ✅     | ✅      |
| View All Mule Accounts   | ❌     | ❌     | ✅     | ✅      |
| Search by Mobile         | ❌     | ❌     | ✅     | ❌      |
| Search by Token          | ❌     | ❌     | ❌     | ✅      |
| View Analytics           | ❌     | ❌     | ✅     | ❌      |
| AI Chatbot               | ✅     | ❌     | ❌     | ❌      |
| Cybercrime Info          | ✅     | ❌     | ❌     | ❌      |

---

## API Authentication Flow

### 1. Manager Flow
```
POST /api/manager/login
  → Validate credentials (env vars)
  → Generate JWT token (8hr expiry)
  → Return token

GET /api/manager/consent/:token
  → Header: Authorization: Bearer <token>
  → Verify JWT
  → Fetch consent record
  → Return data
```

### 2. Banker Flow
```
POST /api/banker/login
  → Validate IFSC + password (CSV)
  → Generate JWT token (8hr expiry)
  → Return token

POST /api/mule-account
  → Header: Authorization: Bearer <token>
  → Verify JWT & extract IFSC
  → Create mule account record
  → Return success
```

### 3. Police Flow
```
POST /api/police/login
  → Validate username + password (env vars)
  → Generate JWT token (8hr expiry)
  → Return token

GET /api/police/records
  → Header: Authorization: Bearer <token>
  → Verify JWT
  → Fetch all consent records
  → Return data
```

---

## Technology Integration Points

### Frontend → Backend
- REST API calls via Axios
- JWT tokens in Authorization header
- CORS enabled for cross-origin requests
- Proxy in dev (Vite) to avoid CORS

### Backend → Database
- Mongoose ODM for MongoDB
- Connection pooling for serverless
- Auto-reconnect on connection loss
- Indexes for fast queries

### Frontend → AI Service
- Google Gemini AI via REST API
- API key from environment variables
- Context-aware chat assistance

### Frontend → Browser APIs
- Web Speech API for voice recognition
- LocalStorage for temporary state
- SessionStorage for auth tokens

---

This structure provides a comprehensive, scalable foundation for the **CyberSuraksha Consent Management System**.

**Developer**: Nimmagadda Sampreeth Chowdary  
**Last Updated**: January 6, 2026
