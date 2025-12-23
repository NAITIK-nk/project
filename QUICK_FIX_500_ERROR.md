# Quick Fix for 500 Error on Registration

## Immediate Steps to Fix

### 1. Check Backend Terminal
Look at your backend server terminal. You should see detailed error logs now. The error will tell you exactly what's wrong.

### 2. Most Common Issues:

#### Issue A: MongoDB Not Connected
**Check:** Backend terminal should show:
```
✅ Connected to MongoDB: mongodb://localhost:27017/SAMAY
```

**If not showing:**
- Start MongoDB: `mongod`
- Check connection string in `.env`: `MONGODB_URI=mongodb://localhost:27017/SAMAY`

#### Issue B: Missing .env File
**Create** `backend/.env` file:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/SAMAY
JWT_SECRET=your_secret_key_here_change_this
NODE_ENV=development
```

#### Issue C: Server Not Running
**Start backend:**
```bash
cd backend
npm run dev
```

### 3. Test Connection
```bash
# Open new terminal
mongosh
use SAMAY
# Should connect successfully
```

### 4. Restart Everything
```bash
# 1. Stop backend (Ctrl+C in backend terminal)
# 2. Start MongoDB (if not running)
mongod

# 3. Start backend
cd backend
npm run dev
```

### 5. Check Error Details
The updated code now shows detailed errors. Look for:
- Error message
- Error code
- Stack trace

This will tell you exactly what's wrong.

## What Changed

I've updated the error handling to:
- ✅ Show detailed error messages in development
- ✅ Log full error details to console
- ✅ Handle MongoDB connection errors specifically
- ✅ Provide better error messages

## Next Steps

1. **Check your backend terminal** - it will show the exact error
2. **Share the error message** from the terminal if you need more help
3. **Verify MongoDB is running** - this is the #1 cause
4. **Check .env file exists** - this is the #2 cause

## Expected Behavior

When registration works, you should see in backend terminal:
```
Registration successful for: user@example.com
```

And in browser:
- User redirected to home page
- Header shows user name/email
- No errors in console

