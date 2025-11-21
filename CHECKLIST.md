# Setup Checklist

Use this checklist to set up and deploy your Cybersafety Consent Application.

## ☐ Initial Setup

### Prerequisites

- [ ] Node.js 18+ installed
- [ ] npm 9+ installed
- [ ] Git installed
- [ ] MongoDB Atlas account created
- [ ] Vercel account created (for deployment)
- [ ] Modern browser (Chrome/Edge) for testing

### Installation

- [ ] Clone/download the project
- [ ] Run `npm run install:all` from project root
- [ ] Verify all dependencies installed without errors

## ☐ MongoDB Atlas Configuration

- [ ] Create new cluster (free tier is fine)
- [ ] Create database user with read/write permissions
- [ ] Note down username and password
- [ ] Add IP whitelist entry (0.0.0.0/0 for development)
- [ ] Get connection string
- [ ] Test connection string format

## ☐ Environment Configuration

- [ ] Copy `.env.example` to `.env` in project root
- [ ] Set `MONGODB_URI` with your MongoDB connection string
- [ ] Set `MANAGER_USER` (e.g., "admin")
- [ ] Set `MANAGER_PASS` (strong password, 12+ chars)
- [ ] Generate random string for `JWT_SECRET` (32+ chars)
- [ ] Set `NODE_ENV=development`
- [ ] Save the file

## ☐ Local Testing

### Backend Testing

- [ ] Run `cd backend && npm run dev`
- [ ] Verify "MongoDB connected successfully" in console
- [ ] Test health endpoint: http://localhost:5000/api/health
- [ ] Should see `{"success":true,"message":"API is running"}`

### Frontend Testing

- [ ] Open new terminal
- [ ] Run `cd frontend && npm run dev`
- [ ] Verify frontend opens at http://localhost:3000
- [ ] No console errors in browser

### Full Flow Testing

- [ ] Select language (English or Telugu)
- [ ] Enter a test name
- [ ] Allow microphone access when prompted
- [ ] Read first statement clearly
- [ ] Verify speech recognition works
- [ ] Complete all statements
- [ ] Note down the generated token
- [ ] See confirmation page

### Manager Testing

- [ ] Navigate to http://localhost:3000/manager
- [ ] Login with credentials from `.env`
- [ ] Search for the token from customer flow
- [ ] Verify customer details displayed correctly
- [ ] Test logout functionality

## ☐ Code Verification

### Statements

- [ ] Review statements in `frontend/src/config/statements.js`
- [ ] Verify English statements are correct
- [ ] Verify Telugu translations are correct
- [ ] Count matches (should be 13 in each language)

### Styling

- [ ] Test on mobile device or DevTools mobile view
- [ ] Test on tablet size
- [ ] Test on desktop
- [ ] Verify all pages are responsive
- [ ] Check all animations work smoothly

### Browser Compatibility

- [ ] Test in Chrome (recommended)
- [ ] Test in Edge
- [ ] Test in Safari (if available)
- [ ] Verify speech recognition works in supported browsers

## ☐ Pre-Deployment

### Security Check

- [ ] `.env` file is in `.gitignore`
- [ ] No hardcoded secrets in code
- [ ] Manager password is strong
- [ ] JWT secret is random and secure
- [ ] MongoDB IP whitelist configured

### Code Quality

- [ ] No console errors in browser
- [ ] No errors in terminal
- [ ] All components render correctly
- [ ] All API endpoints respond correctly

### Git Setup

- [ ] Initialize git: `git init`
- [ ] Add all files: `git add .`
- [ ] Commit: `git commit -m "Initial commit"`
- [ ] Create GitHub repository
- [ ] Add remote: `git remote add origin <url>`
- [ ] Push: `git push -u origin main`

## ☐ Vercel Deployment

### Vercel Setup

- [ ] Login to Vercel dashboard
- [ ] Click "Add New Project"
- [ ] Import GitHub repository
- [ ] Configure build settings (see DEPLOYMENT.md)

### Environment Variables in Vercel

- [ ] Add `MONGODB_URI`
- [ ] Add `MANAGER_USER`
- [ ] Add `MANAGER_PASS`
- [ ] Add `JWT_SECRET`
- [ ] Add `NODE_ENV=production`

### Deployment

- [ ] Click "Deploy"
- [ ] Wait for build to complete
- [ ] Check deployment logs for errors
- [ ] Note deployment URL

## ☐ Post-Deployment Testing

### Production Testing

- [ ] Visit deployed URL
- [ ] Test customer flow end-to-end
- [ ] Verify speech recognition works (requires HTTPS)
- [ ] Test manager login at `/manager`
- [ ] Search for a consent record
- [ ] Test on mobile device
- [ ] Test on different browsers

### MongoDB Verification

- [ ] Check MongoDB Atlas dashboard
- [ ] Verify new records are being created
- [ ] Check token uniqueness
- [ ] Verify timestamps are correct

### Performance Check

- [ ] Page loads quickly (< 3 seconds)
- [ ] No console errors
- [ ] Speech recognition responsive
- [ ] API calls complete quickly

## ☐ Documentation Review

- [ ] Read README.md thoroughly
- [ ] Review QUICKSTART.md for quick reference
- [ ] Check DEPLOYMENT.md for deployment details
- [ ] Review DEVELOPMENT.md for development tips
- [ ] Read PROJECT_SUMMARY.md for overview

## ☐ Final Checklist

- [ ] Application runs locally without errors
- [ ] All features work as expected
- [ ] Manager dashboard is accessible and functional
- [ ] Deployed to Vercel successfully
- [ ] Production URL works correctly
- [ ] Speech recognition works on deployed site
- [ ] MongoDB is storing records correctly
- [ ] Environment variables are secure
- [ ] No secrets committed to Git
- [ ] Documentation is complete

## ☐ Optional Enhancements

- [ ] Set up custom domain in Vercel
- [ ] Configure email notifications
- [ ] Add analytics (Google Analytics, etc.)
- [ ] Set up monitoring (Sentry, etc.)
- [ ] Enable rate limiting
- [ ] Add backup strategy for MongoDB
- [ ] Set up CI/CD pipeline
- [ ] Create staging environment

## 🎉 Completion

Once all items are checked:

- [ ] Take note of production URL
- [ ] Save manager credentials securely
- [ ] Document any customizations made
- [ ] Share access details with team
- [ ] Schedule regular maintenance checks

## 📞 Need Help?

If you encounter issues:

1. Check the troubleshooting section in README.md
2. Review browser console for errors
3. Check Vercel deployment logs
4. Verify environment variables are set correctly
5. Ensure MongoDB Atlas is accessible
6. Test on supported browsers only

## 📝 Notes

Use this space for your own notes:

```
MongoDB URI: _______________________________________________
Vercel URL: ________________________________________________
Manager Username: __________________________________________
Deployment Date: ___________________________________________
Custom Domain: _____________________________________________
```

---

**Good luck with your deployment!** 🚀
