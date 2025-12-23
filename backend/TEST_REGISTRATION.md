# Testing Registration - Quick Guide

## Prerequisites
- MongoDB running
- Backend server running on port 4000
- Frontend running

## Quick Test Steps

### 1. Test Registration via API (Using Postman/Thunder Client)

**Request:**
```
POST http://localhost:4000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "test123",
  "name": "Test User"
}
```

**Expected Response (201):**
```json
{
  "user": {
    "id": "...",
    "email": "test@example.com",
    "name": "Test User"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "User registered successfully"
}
```

### 2. Verify in MongoDB

```bash
mongosh
use SAMAY
db.users.find().pretty()
```

Should show:
- Email: "test@example.com" (lowercase)
- Password: hashed string (not "test123")
- Name: "Test User"
- createdAt: timestamp

### 3. Test Login with Registered User

**Request:**
```
POST http://localhost:4000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "test123"
}
```

**Expected Response (200):**
```json
{
  "user": {
    "id": "...",
    "email": "test@example.com",
    "name": "Test User"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful"
}
```

### 4. Test Frontend Registration

1. Go to http://localhost:5173/login (or your frontend URL)
2. Click "Sign up" or toggle to registration
3. Fill form and submit
4. Should redirect and show user in header

## Error Testing

### Test Duplicate Email
Try registering same email twice - should get 409 error

### Test Invalid Email
Try email without @ - should get 400 error

### Test Short Password
Try password < 6 chars - should get 400 error

### Test Missing Fields
Try without email or password - should get 400 error

## Success Indicators

✅ User created in MongoDB
✅ Password is hashed
✅ Token returned
✅ Can login with credentials
✅ Frontend stores token
✅ User can access protected routes

