# Deployment Checklist

## Environment Variables

### Backend (.env)
- [ ] MONGODB_URI
- [ ] JWT_SECRET
- [ ] RAZORPAY_KEY_ID
- [ ] RAZORPAY_KEY_SECRET
- [ ] NODE_ENV=production

### Frontend (.env.production)
- [ ] VITE_RAZORPAY_KEY_ID
- [ ] VITE_API_URL (Your backend API URL)
- [ ] VITE_NODE_ENV=production

## Pre-deployment Steps

### Backend
1. Run `npm run build` (if using TypeScript)
2. Test all API endpoints
3. Verify MongoDB connection
4. Check Razorpay integration
5. Verify JWT authentication

### Frontend
1. Run `npm run build`
2. Test the production build locally
3. Verify all API calls
4. Test Razorpay integration
5. Check responsive design

## Deployment Steps

### Backend (Vercel)
1. Push code to GitHub
2. Create new project in Vercel
3. Configure environment variables
4. Deploy
5. Verify health check endpoint
6. Test API endpoints

### Frontend (Vercel)
1. Update CORS settings with production backend URL
2. Push code to GitHub
3. Create new project in Vercel
4. Configure environment variables
5. Deploy
6. Test complete user flow

## Post-deployment Verification
1. Test user registration/login
2. Test product listing/filtering
3. Test cart functionality
4. Test Razorpay payment flow
5. Test order creation/management
6. Verify admin dashboard
7. Check error handling
8. Monitor server logs

## Common Issues
1. CORS errors - Check origin configuration
2. 404 errors - Check API routes and base URL
3. Payment failures - Verify Razorpay keys
4. Database connection - Check MongoDB URI
5. Authentication - Verify JWT configuration
