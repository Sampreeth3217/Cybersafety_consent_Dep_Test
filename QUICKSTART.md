# Quick Start Guide

## Initial Setup (5 minutes)

### 1. Install Dependencies

```powershell
# From project root
npm run install:all
```

### 2. Configure Environment

```powershell
# Copy example file
Copy-Item .env.example .env

# Edit .env with your MongoDB credentials
# Minimum required:
# - MONGODB_URI
# - MANAGER_USER
# - MANAGER_PASS
# - JWT_SECRET
```

### 3. Start Development Server

```powershell
npm run dev
```

Application will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Manager: http://localhost:3000/manager

## Common Tasks

### Add/Modify Statements

Edit `frontend/src/config/statements.js`:

```javascript
export const statements = {
  en: [
    "Your English statement here...",
    // Add more...
  ],
  te: [
    "మీ తెలుగు ప్రకటన ఇక్కడ...",
    // Add more...
  ],
};
```

### Change Speech Similarity Threshold

Edit `frontend/src/config/constants.js`:

```javascript
export const SIMILARITY_THRESHOLD = 0.6; // 60% match (adjust as needed)
```

### Customize Styling

Edit CSS files in:

- `frontend/src/components/*.css` - Component styles
- `frontend/src/pages/*.css` - Page styles
- `frontend/src/index.css` - Global styles

## Testing

### Test Customer Flow

1. Go to http://localhost:3000
2. Select language
3. Enter name
4. Read statements (allow microphone access)
5. Complete flow and note the token

### Test Manager Flow

1. Go to http://localhost:3000/manager
2. Login with credentials from `.env`
3. Search using the token from customer flow
4. Verify details are displayed correctly

## Deployment Checklist

- [ ] Update environment variables in Vercel
- [ ] Test speech recognition on HTTPS
- [ ] Verify MongoDB connection from Vercel
- [ ] Test manager authentication
- [ ] Check responsive design on mobile
- [ ] Verify all statements are correct
- [ ] Test end-to-end flow

## Need Help?

Check the main README.md for:

- Full API documentation
- Detailed troubleshooting
- Security best practices
- Browser compatibility info
