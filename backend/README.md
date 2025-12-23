# SAMAY Watch Store - Backend API

Backend API for the SAMAY luxury watch e-commerce platform.

## Features

- 🔐 User Authentication (Register/Login with JWT)
- 📦 Product Management (CRUD operations)
- 🛒 Shopping Cart (Add, Update, Remove items)
- ❤️ Favorites/Wishlist
- 📋 Order Management
- 🔒 Protected Routes with JWT Authentication

## Tech Stack

- **Node.js** with **Express**
- **TypeScript**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcryptjs** for password hashing

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the backend root directory:

```env
# Server Configuration
PORT=4000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/SAMAY

# JWT Secret (change this in production!)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Node Environment
NODE_ENV=development
```

### 3. Start MongoDB

Make sure MongoDB is running on your system. If using local MongoDB:

```bash
# On Windows
mongod

# On Mac/Linux
sudo systemctl start mongod
```

Or use MongoDB Atlas (cloud) and update the `MONGODB_URI` in `.env`.

### 4. Seed Database (Optional)

To populate the database with sample products:

```bash
npm run seed
```

### 5. Run the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

The server will start on `http://localhost:4000` (or the PORT specified in `.env`).

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### Products

- `GET /api/products` - Get all products (with optional filters)
  - Query params: `category`, `brand`, `gender`, `search`, `page`, `limit`
  - Example: `/api/products?category=Luxury&brand=SAMAY&page=1&limit=10`

- `GET /api/products/:id` - Get product by ID

- `POST /api/products` - Create product (requires auth)
- `PUT /api/products/:id` - Update product (requires auth)
- `DELETE /api/products/:id` - Delete product (requires auth)

### Cart (Requires Authentication)

- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
  ```json
  {
    "productId": "product_id_here",
    "quantity": 1
  }
  ```
- `PUT /api/cart/:itemId` - Update cart item quantity
- `DELETE /api/cart/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Orders (Requires Authentication)

- `POST /api/orders` - Create order from cart
  ```json
  {
    "shippingAddress": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "paymentMethod": "credit_card"
  }
  ```
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order by ID
- `PATCH /api/orders/:id` - Update order status

### Favorites (Requires Authentication)

- `GET /api/favorites` - Get user's favorites
- `POST /api/favorites` - Add product to favorites
  ```json
  {
    "productId": "product_id_here"
  }
  ```
- `DELETE /api/favorites/:productId` - Remove from favorites
- `GET /api/favorites/check/:productId` - Check if product is favorited

## Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Database Models

### User
- email (unique)
- password (hashed)
- name

### Product
- name
- price
- originalPrice (optional)
- image
- category (Luxury, Classic, Sport)
- brand (SAMAY, Omega, Rolex, etc.)
- gender (Men, Women, Unisex)
- isOnSale
- description
- stock

### Cart
- userId
- items[] (productId, quantity, price, name, image)
- total (calculated)

### Order
- userId
- items[]
- subtotal
- tax
- shipping
- total
- status (pending, processing, shipped, delivered, cancelled)
- paymentStatus (pending, paid, failed, refunded)
- shippingAddress
- paymentMethod

### Favorite
- userId
- productId

## Project Structure

```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware (auth, etc.)
│   ├── scripts/        # Utility scripts (seed, etc.)
│   ├── db.ts          # Database connection
│   ├── app.ts         # Express app setup
│   └── index.ts       # Server entry point
├── package.json
└── README.md
```

## Development Tips

1. Use Postman or Thunder Client to test API endpoints
2. Check MongoDB connection in console logs
3. JWT tokens expire after 7 days (configurable in auth controller)
4. All prices are stored in the smallest currency unit (cents) or as decimals
5. Cart automatically calculates totals before saving

## Next Steps

- Add admin role and permissions
- Add product image upload functionality
- Add email notifications for orders
- Add payment gateway integration (Stripe, PayPal, etc.)
- Add order tracking
- Add product reviews and ratings

