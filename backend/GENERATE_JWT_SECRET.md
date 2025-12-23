# How to Generate JWT Secret

## What is JWT Secret?

The JWT_SECRET is a secret key used to **sign** and **verify** JWT tokens. It's not a token itself - it's a password that ensures your tokens are secure and haven't been tampered with.

## Method 1: Generate Using Node.js (Recommended)

### Quick Generate Script

Create a file `backend/generate-secret.js`:

```javascript
const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');
console.log('Your JWT_SECRET:');
console.log(secret);
```

Then run:
```bash
cd backend
node generate-secret.js
```

This will output a secure random secret like:
```
Your JWT_SECRET:
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2
```

### One-Line Command (Windows)
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### One-Line Command (Mac/Linux)
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Method 2: Use Online Generator

Visit: https://generate-secret.vercel.app/64

Or use: https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx

Generate a 64-character (or longer) random string.

## Method 3: Manual Generation

You can use any long, random string. For example:
- Use a password generator
- Combine random words and numbers
- Use a UUID generator multiple times

**Important:** Make it at least 32 characters long, preferably 64+ characters.

## Where to Put It

### Step 1: Create/Edit `.env` file

Create or edit `backend/.env` file:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/SAMAY
JWT_SECRET=your_generated_secret_here_paste_it_here
NODE_ENV=development
```

### Step 2: Replace the placeholder

Replace `your_generated_secret_here_paste_it_here` with your generated secret.

Example:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/SAMAY
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2
NODE_ENV=development
```

## Important Notes

### ✅ DO:
- Use a long, random string (64+ characters)
- Keep it secret - never share it
- Use different secrets for development and production
- Store it in `.env` file (which should be in `.gitignore`)

### ❌ DON'T:
- Use simple words like "password" or "secret"
- Use the same secret for all environments
- Commit `.env` file to Git
- Share your secret publicly

## Verify It's Working

After setting your JWT_SECRET:

1. Restart your backend server
2. Try to register a user
3. Check if you get a token back

If registration works and you get a token, your JWT_SECRET is working correctly!

## Quick Setup Script

I'll create a helper script for you to generate the secret easily.




