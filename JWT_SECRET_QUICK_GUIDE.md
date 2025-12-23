# Quick Guide: Generate JWT Secret

## What is JWT_SECRET?

JWT_SECRET is a **secret key** (not a token) used to sign and verify JWT tokens. Think of it as a password that ensures your tokens are secure.

## 🚀 Quick Method (Easiest)

I've created a script for you! Just run:

```bash
cd backend
npm run generate-secret
```

This will generate a secure random secret and show you exactly what to add to your `.env` file.

## 📝 Step-by-Step

### Step 1: Generate the Secret

**Option A: Use the script (Recommended)**
```bash
cd backend
npm run generate-secret
```

**Option B: One-line command**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Option C: Use online generator**
- Visit: https://generate-secret.vercel.app/64
- Copy the generated string

### Step 2: Add to .env File

Create or edit `backend/.env` file:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/SAMAY
JWT_SECRET=paste_your_generated_secret_here
NODE_ENV=development
```

**Example:**
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/SAMAY
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2
NODE_ENV=development
```

### Step 3: Restart Backend

After adding JWT_SECRET to `.env`:

```bash
# Stop backend (Ctrl+C)
# Start again
npm run dev
```

## ✅ Verify It Works

1. Try to register a user
2. If you get a token back, it's working!
3. If you get an error, check:
   - `.env` file exists in `backend` folder
   - JWT_SECRET is on its own line
   - No quotes around the secret
   - Restarted backend after adding it

## 🔒 Security Tips

- ✅ Use a long random string (64+ characters)
- ✅ Keep it secret - never share
- ✅ Use different secrets for dev and production
- ✅ Don't commit `.env` to Git

- ❌ Don't use simple words like "password"
- ❌ Don't use the same secret everywhere
- ❌ Don't share it publicly

## 🆘 Troubleshooting

### "JWT_SECRET is not defined"
- Make sure `.env` file exists in `backend` folder
- Check the file name is exactly `.env` (not `.env.txt`)
- Restart backend after creating/editing `.env`

### Still getting errors?
1. Run: `npm run generate-secret`
2. Copy the output
3. Paste into `backend/.env` as `JWT_SECRET=...`
4. Restart backend

## Example .env File

Your complete `backend/.env` should look like:

```env
# Server Configuration
PORT=4000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/SAMAY

# JWT Secret (generate with: npm run generate-secret)
JWT_SECRET=your_64_character_random_string_here

# Environment
NODE_ENV=development
```

That's it! Once you add JWT_SECRET to your `.env` file and restart the backend, your authentication will work. 🎉




