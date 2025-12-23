# Troubleshooting 500 Internal Server Error on Registration

## Common Causes and Solutions

### 1. MongoDB Not Running
**Symptoms:** Error in server logs about connection
**Solution:**
```bash
# Start MongoDB
mongod

# Or check if it's running
# Windows: Check Services
# Mac/Linux: sudo systemctl status mongod
```

### 2. MongoDB Connection String Wrong
**Symptoms:** Connection error in logs
**Solution:**
- Check `.env` file has: `MONGODB_URI=mongodb://localhost:27017/SAMAY`
- Verify MongoDB is on port 27017
- Try: `mongodb://127.0.0.1:27017/SAMAY`

### 3. Missing Environment Variables
**Symptoms:** JWT_SECRET error
**Solution:**
Create `.env` file in `backend` folder:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/SAMAY
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### 4. Database/Collection Issue
**Symptoms:** Model creation fails
**Solution:**
- MongoDB creates database automatically
- Check if you can connect: `mongosh` → `use SAMAY`
- Try restarting backend server

### 5. Port Already in Use
**Symptoms:** Server won't start
**Solution:**
- Change PORT in `.env` to 4001
- Or kill process using port 4000

### 6. Missing Dependencies
**Symptoms:** Module not found errors
**Solution:**
```bash
cd backend
npm install
```

## Debugging Steps

### Step 1: Check Backend Logs
Look at your backend terminal for error messages. The error should show:
- What went wrong
- Where it happened
- Stack trace

### Step 2: Test MongoDB Connection
```bash
mongosh
use SAMAY
db.users.find()
```

### Step 3: Test API Directly
Use Postman or curl:
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test"}'
```

### Step 4: Check Server Status
Make sure backend is running:
- Should see: `✅ Connected to MongoDB: mongodb://localhost:27017/SAMAY`
- Should see: `Server listening on http://localhost:4000`

### Step 5: Check Browser Console
Look for:
- CORS errors
- Network errors
- Request/response details

## Quick Fixes

### Restart Everything
```bash
# Stop backend (Ctrl+C)
# Stop MongoDB if needed
# Start MongoDB
mongod

# Start backend
cd backend
npm run dev
```

### Clear and Reinstall
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Check .env File
Make sure `.env` exists in `backend` folder with:
```env
MONGODB_URI=mongodb://localhost:27017/SAMAY
JWT_SECRET=some_secret_key
PORT=4000
NODE_ENV=development
```

## Getting More Details

The updated code now logs detailed error information. Check your backend terminal for:
- Error message
- Error name
- Error code
- Stack trace

This will help identify the exact issue.

## Common Error Messages

### "MongoServerError: E11000 duplicate key error"
- User already exists
- Try different email

### "MongoNetworkError"
- MongoDB not running
- Connection string wrong

### "ValidationError"
- Invalid data format
- Check email/password format

### "JWT_SECRET is not defined"
- Missing JWT_SECRET in .env
- Add it to .env file

## Still Having Issues?

1. Check backend terminal for full error
2. Verify MongoDB is running
3. Verify .env file exists and is correct
4. Try restarting everything
5. Check if port 4000 is available

