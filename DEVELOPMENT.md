# Development Scripts for Cybersafety Consent App

## Quick Commands Reference

### Installation

```powershell
# Install all dependencies (root, frontend, backend)
npm run install:all
```

### Development

```powershell
# Run both frontend and backend together
npm run dev

# Run frontend only (port 3000)
npm run dev:frontend

# Run backend only (port 5000)
npm run dev:backend
```

### Building

```powershell
# Build frontend for production
npm run build
```

### Testing URLs (Local Development)

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Manager Login: http://localhost:3000/manager
- Health Check: http://localhost:5000/api/health

### Environment Setup

```powershell
# Copy environment template
Copy-Item .env.example .env

# Edit environment file
notepad .env
```

### Git Operations

```powershell
# Initialize and push to GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### Vercel Deployment

```powershell
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Link project
vercel link

# Deploy to production
vercel --prod

# View logs
vercel logs --prod
```

### Database Operations

```powershell
# MongoDB Atlas connection test
# Make sure MONGODB_URI is set in .env, then start backend
cd backend
npm run dev
# Check console for "MongoDB connected successfully"
```

### Troubleshooting

```powershell
# Clear node_modules and reinstall
Remove-Item -Recurse -Force node_modules, frontend/node_modules, backend/node_modules
npm run install:all

# Check Node and npm versions
node --version  # Should be >= 18.0.0
npm --version   # Should be >= 9.0.0

# Clear npm cache
npm cache clean --force
```

### Port Management (if ports are busy)

```powershell
# Check what's using port 3000
netstat -ano | findstr :3000

# Check what's using port 5000
netstat -ano | findstr :5000

# Kill a process by PID (replace 1234 with actual PID)
taskkill /PID 1234 /F
```

### File Structure Check

```powershell
# List all source files
Get-ChildItem -Recurse -Include *.js,*.jsx,*.json,*.css | Select-Object FullName

# Count lines of code
(Get-ChildItem -Recurse -Include *.js,*.jsx | Get-Content | Measure-Object -Line).Lines
```

## Common Tasks

### Add New Statement

1. Open `frontend/src/config/statements.js`
2. Add to both `en` and `te` arrays
3. Restart frontend dev server

### Change Speech Threshold

1. Open `frontend/src/config/constants.js`
2. Modify `SIMILARITY_THRESHOLD` (0.0 to 1.0)
3. Restart frontend dev server

### Update Manager Credentials

1. Edit `.env` file
2. Update `MANAGER_USER` and `MANAGER_PASS`
3. Restart backend dev server

### Add New API Endpoint

1. Create route in `backend/api/routes/`
2. Import and use in `backend/api/index.js`
3. Restart backend dev server

## Production Checks

### Before Deployment

- [ ] Test customer flow end-to-end
- [ ] Test manager login and search
- [ ] Verify all statements are correct
- [ ] Test on Chrome, Edge, and Safari
- [ ] Test on mobile devices
- [ ] Verify environment variables are set
- [ ] Check MongoDB connection
- [ ] Review security settings

### After Deployment

- [ ] Test live URL
- [ ] Verify HTTPS is working
- [ ] Test speech recognition on live site
- [ ] Test manager dashboard on live site
- [ ] Monitor Vercel logs for errors
- [ ] Check MongoDB Atlas metrics

## Useful VS Code Extensions

- ESLint
- Prettier
- MongoDB for VS Code
- Thunder Client (API testing)
- GitLens

## Environment Variables Quick Reference

```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
MANAGER_USER=admin
MANAGER_PASS=SecurePassword123
JWT_SECRET=random_32_plus_character_secret_key
NODE_ENV=development
```

## API Testing with curl

### Test Health Endpoint

```powershell
curl http://localhost:5000/api/health
```

### Test Consent Submission

```powershell
$body = @{
    name = "Test User"
    token = "ABC1234"
    language = "en"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:5000/api/consent -Method Post -Body $body -ContentType "application/json"
```

### Test Manager Login

```powershell
$credentials = @{
    username = "admin"
    password = "password"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:5000/api/manager/login -Method Post -Body $credentials -ContentType "application/json"
```

## Performance Tips

1. **Reduce bundle size**: Use `npm run build` and check `frontend/dist` size
2. **Optimize images**: Use WebP format for any images
3. **Lazy loading**: Components are already code-split by route
4. **MongoDB indexes**: Token field is already indexed
5. **Caching**: Vercel handles static asset caching automatically

## Security Reminders

- Never commit `.env` file
- Use strong passwords (12+ characters, mixed case, numbers, symbols)
- Rotate JWT_SECRET periodically in production
- Keep dependencies updated: `npm audit fix`
- Enable MongoDB Atlas IP whitelisting in production
- Use HTTPS everywhere (automatic on Vercel)

## Getting Help

1. Check error logs in terminal
2. Review browser console (F12)
3. Check Vercel deployment logs
4. Review MongoDB Atlas logs
5. Consult README.md troubleshooting section
6. Check API documentation in README.md

## Quick Fixes

### "Cannot find module" error

```powershell
npm run install:all
```

### "Port already in use" error

```powershell
# Change port in vite.config.js (frontend) or use different port
# Or kill the process using the port
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### "MongoDB connection failed" error

- Check MONGODB_URI in .env
- Verify IP whitelist in MongoDB Atlas
- Test connection string manually

### "Speech recognition not working" error

- Use Chrome or Edge browser
- Allow microphone permissions
- Ensure HTTPS (required for Web Speech API)
- Check browser console for errors
