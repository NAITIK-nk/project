# Fix MongoDB Connection Error

## Error Message
```
Database connection error. Please try again later.
```

This means **MongoDB is not running** or **not accessible**.

## ✅ Quick Fix (3 Steps)

### Step 1: Start MongoDB

**Windows:**
```bash
# Option 1: If MongoDB is installed as a service
net start MongoDB

# Option 2: If you need to start manually
mongod
```

**Mac:**
```bash
# If installed via Homebrew
brew services start mongodb-community

# Or manually
mongod --config /usr/local/etc/mongod.conf
```

**Linux:**
```bash
sudo systemctl start mongod

# Or
sudo service mongod start
```

### Step 2: Verify MongoDB is Running

Open a **new terminal** and test:

```bash
mongosh
```

If it connects, you'll see:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000
Using MongoDB: ...
Using Mongosh: ...
```

If you get "connection refused" or similar, MongoDB is not running.

### Step 3: Restart Backend

After MongoDB is running:

```bash
# In your backend terminal
# Stop backend (Ctrl+C)
# Start again
cd backend
npm run dev
```

You should now see:
```
✅ Connected to MongoDB: mongodb://localhost:27017/SAMAY
Server listening on http://localhost:4000
```

## 🔍 Verify Everything is Working

### Check 1: MongoDB is Running
```bash
mongosh
use SAMAY
# Should connect without errors
```

### Check 2: Backend Connected
Look at your backend terminal. You should see:
```
✅ Connected to MongoDB: mongodb://localhost:27017/SAMAY
```

### Check 3: Test Registration
Try registering a user again. It should work now!

## 🆘 If MongoDB Won't Start

### Windows Issues

**"mongod is not recognized"**
- MongoDB is not installed or not in PATH
- Install MongoDB: https://www.mongodb.com/try/download/community
- Or add MongoDB to your PATH

**"Port 27017 already in use"**
- Another MongoDB instance is running
- Find and stop it:
  ```bash
  tasklist | findstr mongod
  taskkill /F /IM mongod.exe
  ```

### Mac Issues

**"mongod: command not found"**
- Install MongoDB:
  ```bash
  brew tap mongodb/brew
  brew install mongodb-community
  ```

**"Address already in use"**
- Stop existing MongoDB:
  ```bash
  brew services stop mongodb-community
  ```

### Linux Issues

**"mongod: command not found"**
- Install MongoDB:
  ```bash
  sudo apt-get install -y mongodb
  # Or for newer versions
  wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
  ```

## 🔧 Alternative: Use MongoDB Atlas (Cloud)

If local MongoDB is too difficult, use free cloud MongoDB:

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create a free cluster
4. Get connection string
5. Update `.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/SAMAY
   ```

## 📋 Complete Checklist

- [ ] MongoDB is installed
- [ ] MongoDB is running (`mongod` or service started)
- [ ] Can connect with `mongosh`
- [ ] Backend `.env` has correct `MONGODB_URI`
- [ ] Backend shows "✅ Connected to MongoDB"
- [ ] Backend server is running on port 4000
- [ ] Try registration - should work now!

## 🎯 Most Common Solution

**99% of the time, the issue is:**

1. MongoDB is not running
2. Solution: Start it with `mongod` (Windows) or `brew services start mongodb-community` (Mac)

That's it! Once MongoDB is running, your registration will work.

## Still Having Issues?

1. **Check backend terminal** - What error does it show?
2. **Check MongoDB logs** - Usually in `/var/log/mongodb/` or MongoDB data directory
3. **Try different connection string** - `mongodb://127.0.0.1:27017/SAMAY`
4. **Check firewall** - Make sure port 27017 is not blocked

The key is: **MongoDB must be running before your backend can connect to it!**




