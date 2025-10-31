# Deployment Guide - MarkLine Application

This guide will help you deploy the MarkLine Next.js application to Vercel (free tier) with MongoDB Atlas.

## Prerequisites

- GitHub/GitLab/Bitbucket account
- MongoDB Atlas account (already configured)
- Vercel account (free tier)

## Step 1: Prepare MongoDB Atlas

1. **Verify IP Whitelist**
   - Go to MongoDB Atlas → Network Access
   - Add IP Address: `0.0.0.0/0` (allows access from anywhere, needed for Vercel)
   - Click "Add IP Address"

2. **Get Connection String**
   - Your connection string format:
   ```
   mongodb+srv://markline:NPT9LhmixpVf%40yN@cluster0.e19alq2.mongodb.net/markline?appName=Cluster0
   ```
   - Note: Password is URL encoded (`@` becomes `%40`)

## Step 2: Push Code to GitHub

1. **Commit all changes:**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   ```

2. **Push to GitHub:**
   ```bash
   git push origin master
   ```
   (Or create a new repository if you don't have one)

## Step 3: Deploy to Vercel

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub/GitLab/Bitbucket

2. **Import Project**
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   - In Vercel project settings → Environment Variables
   - Add the following:
   
   | Variable | Value |
   |----------|-------|
   | `MONGODB_URI` | `mongodb+srv://markline:NPT9LhmixpVf%40yN@cluster0.e19alq2.mongodb.net/markline?appName=Cluster0` |
   | `JWT_SECRET` | `adb52e575e85840f169f23fd2b870f69ad4ec1fde9ce90997fe2ffb8ba1f3360` |
   | `NODE_ENV` | `production` |

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (usually 2-3 minutes)

## Step 4: Post-Deployment Setup

1. **Seed Database**
   - Visit: `https://your-app.vercel.app/api/seed`
   - This will create:
     - Admin user: `admin@markline.sa` (you'll need to set password via registration or update)
     - Sample data for services, testimonials, FAQs, etc.

2. **Test Admin Login**
   - Go to: `https://your-app.vercel.app/admin`
   - Login with admin credentials

3. **Verify Functionality**
   - Test API endpoints
   - Test file uploads (if needed, configure Vercel Blob Storage)
   - Test admin panel functionality

## Environment Variables Reference

### Required Variables

- **MONGODB_URI**: MongoDB Atlas connection string
- **JWT_SECRET**: Secret key for JWT token signing (use the generated one from .env.example)

### Optional Variables

- **NODE_ENV**: Set to `production` for production deployments

## Important Notes

1. **Password Security**: Never commit `.env` files. Always use environment variables in Vercel dashboard.

2. **MongoDB Atlas IP Whitelist**: Make sure `0.0.0.0/0` is whitelisted for Vercel to access your database.

3. **File Uploads**: Video uploads larger than 4.5MB may need Vercel Blob Storage configuration (free tier: 1GB).

4. **Free Tier Limits**:
   - Vercel: Unlimited deployments, 100GB bandwidth/month
   - MongoDB Atlas: 512MB storage, shared cluster

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Database Connection Errors
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check connection string format (password URL encoding)
- Verify database name matches in connection string

### Authentication Not Working
- Verify `JWT_SECRET` is set correctly
- Check cookie settings (secure flag in production)
- Ensure `NODE_ENV=production` is set

## Support

For issues, check:
- Vercel deployment logs
- MongoDB Atlas connection logs
- Browser console for client-side errors

