# User Registration Guide

## Overview
The registration functionality is now fully implemented and stores new users in MongoDB. This guide explains how it works and how to troubleshoot issues.

## How Registration Works

### Backend Flow
1. User submits registration form with email, password, and name
2. Backend validates the input:
   - Email format validation
   - Password length (minimum 6 characters)
   - Email uniqueness check
3. Password is hashed using bcrypt
4. User is saved to MongoDB in the `users` collection
5. JWT token is generated and returned
6. User is automatically logged in

### Frontend Flow
1. User fills registration form
2. Frontend validates password match and length
3. API call to `/api/auth/register`
4. Token and user data stored in localStorage
5. User redirected to intended page or home

## Database Schema

### User Model Structure
```javascript
{
  email: String (required, unique, lowercase, validated)
  password: String (required, hashed with bcrypt, min 6 chars)
  name: String (optional, max 100 chars)
  createdAt: Date (auto-generated)
}
```

### Collection Name
- Collection: `users`
- Model Name: `User`

## Testing Registration

### Step 1: Start Backend Server
```bash
cd backend
npm run dev
```
You should see:
```
✅ Connected to MongoDB: mongodb://localhost:27017/SAMAY
Server listening on http://localhost:4000
```

### Step 2: Start Frontend
```bash
npm run dev
```

### Step 3: Test Registration
1. Navigate to `/login` page
2. Click "Sign up" or toggle to registration mode
3. Fill in the form:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Password: "password123"
   - Confirm Password: "password123"
4. Click "Create Account"
5. Should redirect to home page
6. Check header - should show user name/email

### Step 4: Verify in MongoDB
```bash
# Connect to MongoDB
mongosh

# Use your database
use SAMAY

# Check users collection
db.users.find().pretty()
```

You should see your newly registered user (password will be hashed).

## Troubleshooting Guide

### Issue 1: "Email and password are required"
**Cause:** Missing email or password in request
**Solution:**
- Check that form fields are properly named
- Verify form data is being sent correctly
- Check browser console for errors

### Issue 2: "User with this email already exists"
**Cause:** Email is already registered
**Solution:**
- Try a different email address
- Or login with existing credentials
- Check MongoDB: `db.users.find({ email: "your@email.com" })`

### Issue 3: "Password must be at least 6 characters long"
**Cause:** Password too short
**Solution:**
- Use a password with at least 6 characters
- Frontend also validates this before sending

### Issue 4: "Please provide a valid email address"
**Cause:** Invalid email format
**Solution:**
- Check email format (must have @ and .)
- Example: `user@example.com`

### Issue 5: "Server error. Please try again later."
**Cause:** Backend error (check server logs)
**Common Causes:**
- MongoDB not running
- Database connection failed
- Validation error

**Solution:**
1. Check MongoDB is running:
   ```bash
   # Windows
   mongod
   
   # Mac/Linux
   sudo systemctl status mongod
   ```

2. Check backend logs for detailed error

3. Verify `.env` file has correct MongoDB URI:
   ```env
   MONGODB_URI=mongodb://localhost:27017/samay-watches
   ```

### Issue 6: "Network Error" or "Failed to fetch"
**Cause:** Backend server not running or CORS issue
**Solution:**
1. Verify backend is running on port 4000
2. Check `VITE_API_URL` in frontend `.env`:
   ```env
   VITE_API_URL=http://localhost:4000/api
   ```
3. Check browser console for CORS errors
4. Verify backend CORS is enabled in `app.ts`

### Issue 7: Registration succeeds but user not in MongoDB
**Cause:** Database connection issue or wrong database
**Solution:**
1. Check MongoDB connection logs
2. Verify database name in connection string
3. Check if user was created in different database:
   ```bash
   show dbs
   use samay-watches
   db.users.find()
   ```

### Issue 8: "Invalid token" after registration
**Cause:** JWT_SECRET mismatch or token not stored
**Solution:**
1. Check `JWT_SECRET` in backend `.env`
2. Verify token is saved in localStorage:
   ```javascript
   localStorage.getItem('token')
   ```
3. Check browser console for storage errors

### Issue 9: User created but can't login
**Cause:** Password hashing issue or email case mismatch
**Solution:**
1. Backend converts email to lowercase automatically
2. Try login with lowercase email
3. Check password is correct
4. Verify user exists: `db.users.findOne({ email: "user@example.com" })`

### Issue 10: Frontend shows error but backend works
**Cause:** API response format mismatch
**Solution:**
1. Check backend returns: `{ user: {...}, token: "..." }`
2. Verify frontend expects same format
3. Check browser Network tab for actual response

## Verification Checklist

After registration, verify:

- [ ] User appears in MongoDB `users` collection
- [ ] Password is hashed (not plain text)
- [ ] Email is stored in lowercase
- [ ] Token is stored in localStorage
- [ ] User info is stored in localStorage
- [ ] User is redirected after registration
- [ ] Header shows user name/email
- [ ] User can access protected routes
- [ ] User can logout successfully

## API Endpoints

### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}

Response (201):
{
  "user": {
    "id": "...",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "jwt_token_here",
  "message": "User registered successfully"
}
```

### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response (200):
{
  "user": {
    "id": "...",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "jwt_token_here",
  "message": "Login successful"
}
```

## Database Queries

### View All Users
```javascript
db.users.find().pretty()
```

### Find User by Email
```javascript
db.users.findOne({ email: "user@example.com" })
```

### Count Users
```javascript
db.users.countDocuments()
```

### Delete User (for testing)
```javascript
db.users.deleteOne({ email: "user@example.com" })
```

### Check User Structure
```javascript
db.users.findOne({}, { password: 0 }) // Exclude password
```

## Security Features

1. **Password Hashing**: Passwords are hashed with bcrypt (10 rounds)
2. **Email Normalization**: Emails converted to lowercase
3. **Input Validation**: Email format and password length validated
4. **JWT Tokens**: Secure token-based authentication
5. **No Password in Response**: Password never sent back to client

## Common Mistakes to Avoid

1. ❌ Don't store plain text passwords
2. ❌ Don't expose password in API responses
3. ❌ Don't skip email validation
4. ❌ Don't use weak JWT secrets
5. ❌ Don't forget to handle duplicate emails

## Next Steps

After successful registration:
1. User can login with registered credentials
2. User can add items to cart
3. User can add favorites
4. User can proceed to checkout
5. User can view order history (when implemented)

## Support

If you encounter issues not covered here:
1. Check backend server logs
2. Check browser console for errors
3. Check Network tab for API responses
4. Verify MongoDB is running
5. Verify environment variables are set correctly

