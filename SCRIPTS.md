# NPM Scripts Reference

Quick reference for all available npm commands in the project.

## Root Level Commands

Run these from the project root directory:

### Installation

```bash
npm run install:all
# Installs dependencies for root, frontend, and backend
```

### Development

```bash
npm run dev
# Runs both frontend and backend concurrently
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

```bash
npm run dev:frontend
# Runs only the frontend dev server
# Port: 3000
```

```bash
npm run dev:backend
# Runs only the backend dev server
# Port: 5000
```

### Build

```bash
npm run build
# Builds the frontend for production
# Output: frontend/dist/
```

## Frontend Commands

Run these from the `frontend/` directory:

```bash
cd frontend

# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Backend Commands

Run these from the `backend/` directory:

```bash
cd backend

# Development server with auto-restart (nodemon)
npm run dev

# Production server (no auto-restart)
npm start
```

## Common Workflows

### First Time Setup

```bash
# 1. Install all dependencies
npm run install:all

# 2. Configure environment
Copy-Item .env.example .env
# Edit .env with your settings

# 3. Start development servers
npm run dev
```

### Daily Development

```bash
# Start both servers
npm run dev

# In browser:
# - Frontend: http://localhost:3000
# - API: http://localhost:5000/api
# - Manager: http://localhost:3000/manager
```

### Testing API Endpoints

```bash
# Start backend only
npm run dev:backend

# Test endpoints:
# GET  http://localhost:5000/api/health
# POST http://localhost:5000/api/consent
# POST http://localhost:5000/api/manager/login
# GET  http://localhost:5000/api/manager/consent/:token
```

### Building for Production

```bash
# Build frontend
npm run build

# Check build output
dir frontend\dist

# Test production build locally
cd frontend
npm run preview
```

### Clean Install

```bash
# Remove all node_modules
Remove-Item -Recurse -Force node_modules, frontend\node_modules, backend\node_modules

# Reinstall everything
npm run install:all
```

## Package Manager Commands

### npm (default)

```bash
npm install              # Install dependencies
npm update               # Update dependencies
npm audit                # Check for vulnerabilities
npm audit fix            # Fix vulnerabilities
npm outdated             # Check for outdated packages
```

### Alternative: yarn

```bash
yarn install             # Install dependencies
yarn upgrade             # Update dependencies
yarn upgrade-interactive # Interactive update
```

### Alternative: pnpm

```bash
pnpm install             # Install dependencies
pnpm update              # Update dependencies
pnpm outdated            # Check outdated packages
```

## Useful Development Commands

### Check Versions

```powershell
node --version           # Check Node.js version (need 18+)
npm --version            # Check npm version (need 9+)
git --version            # Check Git version
```

### View Running Processes

```powershell
# See what's running on port 3000
netstat -ano | findstr :3000

# See what's running on port 5000
netstat -ano | findstr :5000

# Kill a process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Git Commands

```bash
git status               # Check git status
git add .                # Stage all changes
git commit -m "message"  # Commit changes
git push                 # Push to remote
git pull                 # Pull from remote
```

## Vercel CLI Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link project
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Environment variables
vercel env add VARIABLE_NAME
vercel env ls
vercel env rm VARIABLE_NAME
```

## Debugging Commands

### Frontend Debugging

```bash
# Clear Vite cache
cd frontend
Remove-Item -Recurse -Force node_modules\.vite

# Rebuild
npm run dev
```

### Backend Debugging

```bash
# Run with full logs
cd backend
$env:DEBUG="*"
npm run dev
```

### Database Debugging

```bash
# Test MongoDB connection
cd backend
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Connected!')).catch(err => console.error(err));"
```

## Performance Analysis

### Bundle Size Analysis

```bash
# Build with analysis
cd frontend
npm run build -- --mode production

# Check bundle sizes
dir dist\assets
```

### Dependencies Size

```bash
# Check installed package sizes
npm list --depth=0

# Or use npm-check
npx npm-check
```

## Code Quality

### Linting (if configured)

```bash
npm run lint             # Run linter
npm run lint:fix         # Auto-fix issues
```

### Formatting (if configured)

```bash
npm run format           # Format code
npm run format:check     # Check formatting
```

## Testing (if configured)

```bash
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run with coverage
```

## Maintenance

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update all to latest
npm update

# Update specific package
npm install package-name@latest

# Update major versions (careful!)
npx npm-check-updates -u
npm install
```

### Clean Cache

```bash
# Clear npm cache
npm cache clean --force

# Clear temporary files
Remove-Item -Recurse -Force frontend\dist, frontend\node_modules\.vite
```

### Security Audit

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Fix with breaking changes
npm audit fix --force
```

## Environment-Specific

### Development

```bash
$env:NODE_ENV="development"
npm run dev
```

### Production

```bash
$env:NODE_ENV="production"
npm run build
npm start  # For backend
```

## Quick Reference Table

| Task          | Command                                  |
| ------------- | ---------------------------------------- |
| Install all   | `npm run install:all`                    |
| Start dev     | `npm run dev`                            |
| Build prod    | `npm run build`                          |
| Frontend only | `npm run dev:frontend`                   |
| Backend only  | `npm run dev:backend`                    |
| Deploy        | `vercel --prod`                          |
| Check health  | Visit `http://localhost:5000/api/health` |
| Manager login | Visit `http://localhost:3000/manager`    |

## Tips

1. **Use npm scripts**: Defined scripts ensure consistency across environments
2. **Concurrent dev**: `npm run dev` runs both servers - convenient for full-stack dev
3. **Port conflicts**: If ports are busy, change them in configs or kill processes
4. **Environment vars**: Always set before running production builds
5. **Clean installs**: Remove node_modules and reinstall if issues persist

## Additional Resources

- [npm documentation](https://docs.npmjs.com/)
- [Vite documentation](https://vitejs.dev/)
- [Express documentation](https://expressjs.com/)
- [Vercel CLI documentation](https://vercel.com/docs/cli)

---

Keep this reference handy for quick command lookup during development!
