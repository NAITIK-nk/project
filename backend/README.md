# SAMAY Backend API

Clean, simple backend for SAMAY Watch Store using Node.js, Express, and MongoDB.

## Quick Setup

1. **Create `.env` file in the backend folder:**
   ```
   MONGO_URI=mongodb://127.0.0.1:27017/samay
   PORT=5000
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Make sure MongoDB is running** on your system

4. **Start the server:**
   ```bash
   node SAMAY.js
   ```

## Expected Console Output

```
MongoDB Connected
SAMAY backend running on port 5000
```

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `DELETE /api/users/:id` - Delete user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `DELETE /api/products/:id` - Delete product

### Carts
- `GET /api/carts` - Get all carts
- `GET /api/carts/:id` - Get cart by ID
- `POST /api/carts` - Create cart
- `DELETE /api/carts/:id` - Delete cart

### Favorites
- `GET /api/favorites` - Get all favorites
- `GET /api/favorites/:id` - Get favorite by ID
- `POST /api/favorites` - Add favorite
- `DELETE /api/favorites/:id` - Delete favorite

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create order
- `DELETE /api/orders/:id` - Delete order

### Complaints
- `POST /api/complaints` - Submit complaint
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Issue with order",
    "message": "Your message here"
  }
  ```
- `GET /api/complaints` - Get all complaints
- `GET /api/complaints/:id` - Get complaint by ID
- `DELETE /api/complaints/:id` - Delete complaint

## Database

- Database Name: `samay`
- Collections: `users`, `products`, `carts`, `favorites`, `orders`, `complaints`

## Folder Structure

```
backend/
├── SAMAY.js (main entry file)
├── .env
├── package.json
├── config/
│   └── db.js
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   ├── Favorite.js
│   ├── Order.js
│   └── Complaint.js
└── routes/
    ├── userRoutes.js
    ├── productRoutes.js
    ├── cartRoutes.js
    ├── favoriteRoutes.js
    ├── orderRoutes.js
    └── complaintRoutes.js
```
