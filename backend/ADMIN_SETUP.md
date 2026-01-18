# Admin User Setup Guide

This guide shows you how to create an admin user to access the admin dashboard.

## Method 1: Using the Create Admin Script (Easiest) ⭐

### Quick Setup:
```bash
cd backend
npm run create-admin
```

This will create an admin user with:
- **Email:** `admin@samay.com`
- **Password:** `admin123`
- **Name:** `Admin User`

### Custom Admin User:
```bash
npm run create-admin admin@example.com mypassword123 "Admin Name"
```

**Format:** `npm run create-admin <email> <password> <name>`

**Example:**
```bash
npm run create-admin admin@myshop.com securepass123 "Store Admin"
```

---

## Method 2: Using Node.js Directly

```bash
cd backend
node scripts/createAdmin.js
```

Or with custom credentials:
```bash
node scripts/createAdmin.js admin@example.com mypassword123 "Admin Name"
```

---

## Method 3: Using MongoDB Shell (mongosh)

1. Open MongoDB shell:
```bash
mongosh
```

2. Connect to your database:
```javascript
use samay
```

3. Create admin user (password will be hashed manually or register first, then update):
```javascript
// First, register a user normally through the app, then update to admin:
db.users.updateOne(
  { email: "naitik@admin.com" },
  { $set: { role: "admin" } }
)
```

Or create directly (requires bcrypt - not recommended):
```javascript
// This method is more complex as you need to hash the password
// Better to use Method 1 or 2
```

---

## Method 4: Update Existing User to Admin

If you already have a user account and want to make it admin:

### Option A: Using MongoDB Shell
```bash
mongosh
use samay
db.users.updateOne(
  { email: "naitik@admin.com" },
  { $set: { role: "admin" } }
)
```

### Option B: Using the Script
The script automatically updates existing users if you run it with an existing email.

---

## After Creating Admin

1. **Start your backend server** (if not running):
   ```bash
   cd backend
   npm start
   ```

2. **Login** through the frontend:
   - Go to `/login`
   - Use your admin email and password
   - You'll be automatically redirected to admin dashboard if admin role is detected

3. **Access Admin Dashboard**:
   - Navigate to `/admin` - Dashboard with statistics
   - Navigate to `/admin/products` - Product management

---

## Verify Admin User

Check if user is admin in MongoDB:
```bash
mongosh
use samay
db.users.findOne({ email: "naitik@admin.com" })
```

Look for `"role": "admin"` in the output.

---

## Troubleshooting

### Error: "User already exists"
- The script will automatically update existing users to admin role
- Or use MongoDB shell to update: `db.users.updateOne({ email: "..." }, { $set: { role: "admin" } })`

### Can't access admin dashboard
- Make sure you're logged in with an admin account
- Check browser console for errors
- Verify the user has `role: "admin"` in database
- Try logging out and logging back in

### Script not working
- Make sure MongoDB is running
- Check that `.env` file has correct `MONGO_URI`
- Ensure you're in the `backend` directory when running the script

---

## Security Note

⚠️ **Change the default password after first login!**

For production:
1. Use strong passwords
2. Consider using environment variables for admin credentials
3. Limit admin user creation to authorized personnel only
