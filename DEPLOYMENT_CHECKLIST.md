# Quick Deployment Checklist

## Before Deployment

- [x] MongoDB Atlas cluster configured
- [x] MongoDB connection string obtained
- [ ] MongoDB IP whitelist includes `0.0.0.0/0`
- [ ] Git repository ready (all code committed)
- [ ] Vercel account created

## Deployment Steps

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin master
   ```

2. **Configure Vercel Environment Variables**
   
   Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   
   Add these variables:
   
   ```
   MONGODB_URI=mongodb+srv://markline:NPT9LhmixpVf%40yN@cluster0.e19alq2.mongodb.net/markline?appName=Cluster0
   JWT_SECRET=adb52e575e85840f169f23fd2b870f69ad4ec1fde9ce90997fe2ffb8ba1f3360
   NODE_ENV=production
   ```

3. **Deploy on Vercel**
   - Import project from GitHub
   - Vercel auto-detects Next.js
   - Deploy (build happens automatically)

4. **After Deployment**
   - [ ] Visit: `https://your-app.vercel.app/api/seed` (POST request)
   - [ ] Test admin login at `/admin`
   - [ ] Verify API endpoints work
   - [ ] Test public pages

## Important Notes

⚠️ **Video Upload Limitation**: The current video upload route writes to filesystem, which won't work on Vercel (read-only filesystem). For production, you'll need to:
- Use Vercel Blob Storage, or
- Use Cloudinary/S3 for video storage, or
- Store video URLs instead of uploading files

For testing purposes, you can use the existing videos in `/public/video/` directory.

## MongoDB Connection String

Your formatted connection string:
```
mongodb+srv://markline:NPT9LhmixpVf%40yN@cluster0.e19alq2.mongodb.net/markline?appName=Cluster0
```

Password URL encoding: `@` → `%40`

