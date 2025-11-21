# Deployment Guide for Vercel

This guide will help you deploy the Cybersafety Consent Application to Vercel.

## Prerequisites

- Vercel account (free tier works)
- GitHub account
- MongoDB Atlas cluster set up

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

#### 1. Push to GitHub

```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

#### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

#### 3. Configure Environment Variables

In Vercel project settings, add these environment variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cybersafety
MANAGER_USER=admin
MANAGER_PASS=your_secure_password
JWT_SECRET=your_secret_key_minimum_32_characters
NODE_ENV=production
```

#### 4. Deploy

Click "Deploy" and wait for the build to complete.

### Option 2: Deploy via Vercel CLI

#### 1. Install Vercel CLI

```powershell
npm install -g vercel
```

#### 2. Login to Vercel

```powershell
vercel login
```

#### 3. Link Project

```powershell
vercel link
```

#### 4. Add Environment Variables

```powershell
vercel env add MONGODB_URI
vercel env add MANAGER_USER
vercel env add MANAGER_PASS
vercel env add JWT_SECRET
```

#### 5. Deploy

```powershell
# Deploy to production
vercel --prod
```

## Post-Deployment Configuration

### 1. Update MongoDB Atlas IP Whitelist

Add Vercel's IP addresses to your MongoDB Atlas whitelist:

- Go to MongoDB Atlas → Network Access
- Add IP: `0.0.0.0/0` (allows all IPs - for production, be more specific)

### 2. Configure Custom Domain (Optional)

1. Go to Vercel Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### 3. Test the Deployment

1. Visit your Vercel URL
2. Test customer flow:
   - Select language
   - Enter name
   - Complete speech recognition
   - Verify token generation
3. Test manager flow:
   - Visit `/manager` route
   - Login with credentials
   - Search for a token

## Troubleshooting

### Build Fails

**Issue**: Build command fails

**Solution**:

- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### API Routes Not Working

**Issue**: 404 errors on `/api/*` routes

**Solution**:

- Verify `vercel.json` is in project root
- Check that backend files are in `backend/api/` directory
- Ensure route configurations in `vercel.json` are correct

### MongoDB Connection Fails

**Issue**: Can't connect to MongoDB from Vercel

**Solution**:

- Verify `MONGODB_URI` environment variable is set correctly
- Check MongoDB Atlas IP whitelist includes Vercel IPs
- Ensure MongoDB user has correct permissions

### Speech Recognition Not Working

**Issue**: Microphone doesn't work on deployed site

**Solution**:

- Ensure your domain uses HTTPS (Vercel provides this by default)
- Web Speech API requires secure context (HTTPS)
- Test on supported browsers (Chrome, Edge, Safari)

### Manager Login Fails

**Issue**: Can't login to manager dashboard

**Solution**:

- Verify `MANAGER_USER` and `MANAGER_PASS` environment variables
- Check `JWT_SECRET` is set
- Ensure environment variables are available in production

## Environment Variables Reference

| Variable       | Description               | Example                                          |
| -------------- | ------------------------- | ------------------------------------------------ |
| `MONGODB_URI`  | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `MANAGER_USER` | Manager username          | `admin`                                          |
| `MANAGER_PASS` | Manager password          | `SecurePass123!`                                 |
| `JWT_SECRET`   | Secret for JWT tokens     | `random_32_char_string_here`                     |
| `NODE_ENV`     | Environment mode          | `production`                                     |

## Vercel Configuration

The `vercel.json` file handles:

- Building the frontend from `frontend/` directory
- Routing API requests to serverless functions
- Serving static assets

```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build"
    },
    {
      "src": "backend/api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/$1"
    }
  ]
}
```

## Monitoring & Maintenance

### Check Logs

```powershell
# View real-time logs
vercel logs <deployment-url>

# View production logs
vercel logs --prod
```

### Redeploy

```powershell
# Redeploy after changes
git push origin main  # If using GitHub integration

# Or
vercel --prod  # If using CLI
```

### Update Environment Variables

```powershell
# Update a variable
vercel env add VARIABLE_NAME

# Remove a variable
vercel env rm VARIABLE_NAME

# List all variables
vercel env ls
```

## Performance Optimization

1. **Enable Compression**: Vercel automatically enables Brotli compression
2. **CDN**: Vercel's edge network caches static assets
3. **Serverless Functions**: Each API route is a separate serverless function
4. **Cold Starts**: Keep MongoDB connection alive with connection pooling

## Security Checklist

- [ ] All environment variables set in Vercel
- [ ] MongoDB IP whitelist configured
- [ ] Strong passwords used for manager credentials
- [ ] JWT_SECRET is random and secure (32+ characters)
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] API routes require authentication where needed
- [ ] Input validation implemented on backend

## Cost Considerations

**Vercel Free Tier Includes:**

- 100 GB bandwidth per month
- Unlimited serverless function invocations
- Automatic HTTPS
- Edge network caching

**MongoDB Atlas Free Tier Includes:**

- 512 MB storage
- Shared RAM
- No credit card required

Both free tiers are sufficient for moderate traffic applications.

## Support

For Vercel-specific issues:

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

For application issues:

- See main README.md
- Check backend logs in Vercel dashboard
