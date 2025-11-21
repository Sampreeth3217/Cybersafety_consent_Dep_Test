# Complete File Structure

This document shows the complete file structure of the Cybersafety Consent Application.

```
Cybersafety_consent_v1/
│
├── 📄 README.md                          # Main documentation
├── 📄 QUICKSTART.md                      # Quick start guide
├── 📄 DEPLOYMENT.md                      # Deployment guide for Vercel
├── 📄 DEVELOPMENT.md                     # Development commands and tips
├── 📄 PROJECT_SUMMARY.md                 # Project overview and summary
├── 📄 CHECKLIST.md                       # Setup and deployment checklist
├── 📄 FILE_STRUCTURE.md                  # This file
│
├── 📄 package.json                       # Root package with scripts
├── 📄 .env.example                       # Environment variables template
├── 📄 .gitignore                         # Git ignore rules
├── 📄 vercel.json                        # Vercel deployment configuration
│
├── 📁 frontend/                          # React + Vite frontend application
│   ├── 📄 package.json                   # Frontend dependencies
│   ├── 📄 vite.config.js                 # Vite configuration
│   ├── 📄 index.html                     # HTML entry point
│   ├── 📄 .env.example                   # Frontend env template (optional)
│   │
│   └── 📁 src/                           # Source code
│       ├── 📄 main.jsx                   # Application entry point
│       ├── 📄 App.jsx                    # Main app component with routing
│       ├── 📄 App.css                    # App-level styles
│       ├── 📄 index.css                  # Global styles and CSS variables
│       │
│       ├── 📁 components/                # Reusable UI components
│       │   ├── 📄 LanguageSelector.jsx           # Language selection component
│       │   ├── 📄 LanguageSelector.css
│       │   ├── 📄 NameInputForm.jsx              # Name input form
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
│       ├── 📁 pages/                     # Page components
│       │   ├── 📄 LandingPage.jsx                # Landing/home page
│       │   ├── 📄 LandingPage.css
│       │   ├── 📄 ConsentFlowPage.jsx            # Statement reading flow
│       │   ├── 📄 ConsentFlowPage.css
│       │   ├── 📄 ConfirmationPage.jsx           # Completion page with token
│       │   ├── 📄 ConfirmationPage.css
│       │   ├── 📄 ManagerLoginPage.jsx           # Manager login page
│       │   ├── 📄 ManagerLoginPage.css
│       │   ├── 📄 ManagerDashboardPage.jsx       # Manager dashboard
│       │   └── 📄 ManagerDashboardPage.css
│       │
│       ├── 📁 services/                  # API and service utilities
│       │   ├── 📄 apiClient.js                   # Axios wrapper with interceptors
│       │   └── 📄 speechRecognition.js           # Web Speech API utilities
│       │
│       ├── 📁 config/                    # Configuration files
│       │   ├── 📄 statements.js                  # Bilingual statements data
│       │   └── 📄 constants.js                   # App constants and configs
│       │
│       └── 📁 utils/                     # Helper functions
│           └── 📄 helpers.js                     # Utility functions
│
└── 📁 backend/                           # Node.js + Express backend
    ├── 📄 package.json                   # Backend dependencies
    │
    ├── 📁 api/                           # API routes and server
    │   ├── 📄 index.js                   # Express app and server setup
    │   │
    │   └── 📁 routes/                    # API route handlers
    │       ├── 📄 consent.js             # Consent submission endpoint
    │       └── 📄 manager.js             # Manager authentication and search
    │
    ├── 📁 models/                        # Database models
    │   └── 📄 ConsentRecord.js           # Mongoose schema for consent records
    │
    ├── 📁 config/                        # Backend configuration
    │   └── 📄 database.js                # MongoDB connection with pooling
    │
    ├── 📁 middleware/                    # Express middleware
    │   └── 📄 auth.js                    # JWT authentication middleware
    │
    └── 📁 utils/                         # Backend utilities
        └── 📄 validators.js              # Input validation functions
```

## Component Descriptions

### Frontend Components

| Component               | Purpose                      | Key Features                        |
| ----------------------- | ---------------------------- | ----------------------------------- |
| `LanguageSelector`      | Language selection UI        | Bilingual display, visual selection |
| `NameInputForm`         | User name input              | Validation, error handling          |
| `StatementReader`       | Statement display and speech | Speech recognition, validation      |
| `SpeechStatusIndicator` | Visual feedback              | Animated status, progress display   |
| `ManagerLoginForm`      | Admin authentication         | Secure login, error handling        |
| `ManagerSearchForm`     | Token search interface       | Input validation, search function   |
| `ConsentRecordDisplay`  | Record details display       | Formatted data, close action        |

### Frontend Pages

| Page                   | Route                | Purpose                                   |
| ---------------------- | -------------------- | ----------------------------------------- |
| `LandingPage`          | `/`                  | Language selection and name entry         |
| `ConsentFlowPage`      | `/consent-flow`      | Statement reading with speech recognition |
| `ConfirmationPage`     | `/confirmation`      | Display completion and token              |
| `ManagerLoginPage`     | `/manager`           | Hidden manager authentication             |
| `ManagerDashboardPage` | `/manager/dashboard` | Manager search interface                  |

### Backend Routes

| Method | Endpoint                      | Purpose                | Auth |
| ------ | ----------------------------- | ---------------------- | ---- |
| POST   | `/api/consent`                | Create consent record  | No   |
| POST   | `/api/manager/login`          | Manager authentication | No   |
| GET    | `/api/manager/consent/:token` | Search by token        | Yes  |
| GET    | `/api/manager/verify`         | Verify JWT token       | Yes  |
| GET    | `/api/health`                 | Health check           | No   |

## Key Files Explained

### Configuration Files

- **`vercel.json`**: Configures Vercel deployment, routes, and builds
- **`vite.config.js`**: Vite development server and build configuration
- **`.env.example`**: Template for environment variables
- **`.gitignore`**: Specifies files to exclude from Git

### Data Files

- **`statements.js`**: Contains all 13 cybersafety statements in English and Telugu
- **`constants.js`**: Application-wide constants (routes, thresholds, messages)

### Service Files

- **`apiClient.js`**: Centralized HTTP client with interceptors and auth
- **`speechRecognition.js`**: Web Speech API wrapper with similarity checking
- **`helpers.js`**: Utility functions (token generation, date formatting, etc.)

### Backend Core

- **`api/index.js`**: Express server setup, middleware, error handling
- **`database.js`**: MongoDB connection with pooling for serverless
- **`auth.js`**: JWT token generation and verification
- **`validators.js`**: Input validation and sanitization

### Database Schema

- **`ConsentRecord.js`**:
  - Fields: name, token, language, createdAt, updatedAt
  - Validation: Required fields, enum language, unique token
  - Index: token field for fast lookups

## File Count Summary

| Type           | Count  |
| -------------- | ------ |
| JavaScript/JSX | 26     |
| CSS            | 15     |
| JSON           | 4      |
| Markdown       | 7      |
| Config         | 3      |
| **Total**      | **55** |

## Lines of Code (Approximate)

| Category            | Lines      |
| ------------------- | ---------- |
| Frontend Components | ~1,500     |
| Frontend Pages      | ~1,200     |
| Frontend Services   | ~800       |
| Backend API         | ~500       |
| Backend Models      | ~200       |
| CSS Styling         | ~2,000     |
| Documentation       | ~3,000     |
| **Total**           | **~9,200** |

## Import Relationships

### Frontend Flow

```
main.jsx
  └── App.jsx
      ├── LandingPage.jsx
      │   ├── LanguageSelector.jsx
      │   └── NameInputForm.jsx
      ├── ConsentFlowPage.jsx
      │   ├── StatementReader.jsx
      │   └── SpeechStatusIndicator.jsx
      ├── ConfirmationPage.jsx
      ├── ManagerLoginPage.jsx
      │   └── ManagerLoginForm.jsx
      └── ManagerDashboardPage.jsx
          ├── ManagerSearchForm.jsx
          └── ConsentRecordDisplay.jsx
```

### Backend Flow

```
api/index.js
  ├── routes/consent.js
  │   ├── models/ConsentRecord.js
  │   └── utils/validators.js
  ├── routes/manager.js
  │   ├── models/ConsentRecord.js
  │   ├── middleware/auth.js
  │   └── utils/validators.js
  └── config/database.js
```

## Asset Dependencies

### External Dependencies

**Frontend:**

- react, react-dom (UI framework)
- react-router-dom (routing)
- axios (HTTP client)
- vite (build tool)

**Backend:**

- express (web framework)
- mongoose (MongoDB ODM)
- jsonwebtoken (JWT auth)
- cors (CORS handling)
- dotenv (environment variables)
- bcryptjs (password hashing)

**Total npm packages**: ~50+ (including sub-dependencies)

## File Size Estimates

| Category       | Size    |
| -------------- | ------- |
| Source Code    | ~200 KB |
| node_modules   | ~300 MB |
| Built Frontend | ~500 KB |
| Documentation  | ~150 KB |

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
Vercel Deployment:
├── Frontend (Static Site)
│   └── Served from frontend/dist/
└── Backend (Serverless Functions)
    └── Each route becomes a separate function
        ├── /api/consent
        ├── /api/manager/login
        └── /api/manager/consent/[token]
```

---

This structure provides a clean, organized, and scalable foundation for the Cybersafety Consent Application.
