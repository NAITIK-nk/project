# MongoDB Database Setup

## Database Configuration

Your MongoDB database is configured as:

- **Database Name:** `SAMAY`
- **Connection String:** `mongodb://localhost:27017/SAMAY`
- **Default Port:** `27017`

## Collections

The following collections will be created automatically when you use the application:

1. **`users`** - User accounts (email, password, name)
2. **`products`** - Product catalog
3. **`carts`** - Shopping carts (one per user)
4. **`orders`** - Order history
5. **`favorites`** - User favorites/wishlist

## Setup Instructions

### 1. Create .env File

Create a `.env` file in the `backend` folder:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/SAMAY
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

### 2. Start MongoDB

**Windows:**
```bash
mongod
```

**Mac/Linux:**
```bash
sudo systemctl start mongod
# or
brew services start mongodb-community
```

### 3. Verify Connection

Start your backend server:
```bash
cd backend
npm run dev
```

You should see:
```
✅ Connected to MongoDB: mongodb://localhost:27017/SAMAY
Server listening on http://localhost:4000
```

## MongoDB Commands

### Connect to MongoDB
```bash
mongosh
```

### Use Your Database
```bash
use SAMAY
```

### View All Collections
```bash
show collections
```

### View Users
```bash
db.users.find().pretty()
```

### View Products
```bash
db.products.find().pretty()
```

### View Carts
```bash
db.carts.find().pretty()
```

### View Orders
```bash
db.orders.find().pretty()
```

### View Favorites
```bash
db.favorites.find().pretty()
```

### Count Documents
```bash
db.users.countDocuments()
db.products.countDocuments()
```

### Clear Collection (for testing)
```bash
db.users.deleteMany({})
db.products.deleteMany({})
```

## Database Structure

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, lowercase),
  password: String (hashed),
  name: String (optional),
  createdAt: Date
}
```

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  price: Number,
  originalPrice: Number (optional),
  image: String,
  category: String,
  brand: String,
  gender: String,
  isOnSale: Boolean,
  description: String (optional),
  stock: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Carts Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  items: [{
    productId: ObjectId,
    quantity: Number,
    price: Number,
    name: String,
    image: String
  }],
  total: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  items: [{
    productId: ObjectId,
    quantity: Number,
    price: Number,
    name: String,
    image: String
  }],
  subtotal: Number,
  tax: Number,
  shipping: Number,
  total: Number,
  status: String,
  paymentStatus: String,
  shippingAddress: Object (optional),
  paymentMethod: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Favorites Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  productId: ObjectId (ref: Product),
  createdAt: Date
}
```

## Troubleshooting

### Connection Refused
- Make sure MongoDB is running
- Check if port 27017 is available
- Verify MongoDB service status

### Database Not Found
- MongoDB creates databases automatically on first use
- Just start using the API and the database will be created

### Authentication Error
- If using MongoDB with authentication, update connection string:
  `mongodb://username:password@localhost:27017/SAMAY`

### Connection Timeout
- Check firewall settings
- Verify MongoDB is listening on localhost:27017
- Try `mongodb://127.0.0.1:27017/SAMAY` instead

## Backup & Restore

### Backup Database
```bash
mongodump --db=SAMAY --out=./backup
```

### Restore Database
```bash
mongorestore --db=SAMAY ./backup/SAMAY
```

## Production Notes

For production, consider:
- Using MongoDB Atlas (cloud)
- Setting up authentication
- Using connection pooling
- Enabling SSL/TLS
- Setting up regular backups
- Using environment-specific database names

Example production connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/SAMAY?retryWrites=true&w=majority
```

