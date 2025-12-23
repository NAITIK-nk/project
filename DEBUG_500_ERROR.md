# Debugging 500 Error - Step by Step

## Step 1: Check Backend is Running

Open your browser and go to:
```
http://localhost:4000
```

You should see:
```json
{"message":"SAMAY Watch Store API is running"}
```

If you get "Cannot connect" or "Refused to connect":
- Backend is not running
- Start it: `cd backend && npm run dev`

## Step 2: Test API Endpoint

Go to:
```
http://localhost:4000/api/ping
```

You should see:
```json
{"message":"pong","timestamp":"..."}
```

If this works, your backend is running correctly.

## Step 3: Check Backend Terminal

When you try to register, look at your **backend terminal** (not browser console).

You should see:
```
2024-... - POST /api/auth/register
Registration error: [error details]
Error details: { message: ..., name: ..., code: ... }
```

**This is the most important step** - the backend terminal will show the exact error.

## Step 4: Common Errors and Fixes

### Error: "MongoServerError" or "MongoNetworkError"
**Problem:** MongoDB not connected
**Fix:**
```bash
# Start MongoDB
mongod

# Restart backend
cd backend
npm run dev
```

### Error: "JWT_SECRET is not defined"
**Problem:** Missing .env file
**Fix:** Create `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/SAMAY
JWT_SECRET=your_secret_key
PORT=4000
NODE_ENV=development
```

### Error: "Cannot read property 'hash' of undefined"
**Problem:** bcrypt issue
**Fix:**
```bash
cd backend
npm install bcryptjs
```

### Error: "ValidationError"
**Problem:** Invalid data format
**Check:** Email format, password length

## Step 5: Test with curl/Postman

Test the API directly (bypass frontend):

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'
```

This will show you the exact error response.

## Step 6: Check Browser Network Tab

1. Open browser DevTools (F12)
2. Go to Network tab
3. Try to register
4. Click on the `/api/auth/register` request
5. Check:
   - Status code (should be 201, not 500)
   - Response tab (shows error message)
   - Headers tab (check CORS)

## Step 7: Verify MongoDB

```bash
mongosh
use SAMAY
db.users.find()
```

If this fails, MongoDB is not running or not accessible.

## What to Share for Help

If you still have issues, share:

1. **Backend terminal output** - The error message from backend
2. **Browser Network tab** - The response from the failed request
3. **MongoDB status** - Can you connect with `mongosh`?
4. **.env file** - Does it exist? (don't share the secret, just confirm it exists)

## Quick Checklist

- [ ] Backend server is running (`npm run dev` in backend folder)
- [ ] MongoDB is running (`mongod`)
- [ ] `.env` file exists in `backend` folder
- [ ] Can access `http://localhost:4000` in browser
- [ ] Can access `http://localhost:4000/api/ping` in browser
- [ ] Backend terminal shows connection message
- [ ] No errors in backend terminal on startup

## Still Not Working?

1. **Stop everything** (Ctrl+C in all terminals)
2. **Start MongoDB**: `mongod`
3. **Wait 5 seconds** for MongoDB to start
4. **Start backend**: `cd backend && npm run dev`
5. **Check for errors** in backend terminal
6. **Try registration again**
7. **Check backend terminal** for error message

The backend terminal is your best friend - it will tell you exactly what's wrong!

