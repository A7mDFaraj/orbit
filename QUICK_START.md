# Quick Start - Deploy to GitHub & Vercel

## ✅ Completed Steps

- [x] MongoDB connection string formatted
- [x] Environment variables documented
- [x] Vercel configuration created (`vercel.json`)
- [x] Deployment documentation created
- [x] Code committed to git
- [x] All files staged and ready

## 🚀 Next Steps (Do These Now)

### 1. Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `markline` (or your choice)
3. Make it **PUBLIC** ✅
4. **DO NOT** check any boxes (no README, no .gitignore, no license)
5. Click **"Create repository"**

### 2. Push Code to GitHub

After creating the repo, run these commands (replace `YOUR_USERNAME`):

```bash
git remote add origin https://github.com/YOUR_USERNAME/markline.git
git branch -M main
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/johndoe/markline.git
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel

1. Go to https://vercel.com
2. Sign up/login with GitHub
3. Click **"Add New Project"**
4. Import your `markline` repository
5. Add Environment Variables (see below)
6. Click **"Deploy"**

### 4. Environment Variables in Vercel

Add these in Vercel Dashboard → Settings → Environment Variables:

```
MONGODB_URI=mongodb+srv://markline:NPT9LhmixpVf%40yN@cluster0.e19alq2.mongodb.net/markline?appName=Cluster0
JWT_SECRET=adb52e575e85840f169f23fd2b870f69ad4ec1fde9ce90997fe2ffb8ba1f3360
NODE_ENV=production
```

### 5. After Deployment

1. Visit: `https://your-app.vercel.app/api/seed` (use POST request or curl)
2. Test admin login at `/admin`
3. Verify all pages work

## 📋 Files Created

- `vercel.json` - Vercel configuration
- `DEPLOYMENT.md` - Detailed deployment guide
- `DEPLOYMENT_CHECKLIST.md` - Quick checklist
- `GITHUB_SETUP.md` - GitHub setup instructions
- `README.md` - Project README

## ⚠️ Important Notes

- Make sure MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Video uploads won't work on Vercel (filesystem is read-only) - use existing videos for now
- Admin email after seeding: `admin@markline.sa` (password set during seed)

