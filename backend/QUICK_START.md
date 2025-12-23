# Quick Start Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)

## Setup Steps

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Create .env File
Create a `.env` file in the `backend` folder with:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/SAMAY
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### 3. Start MongoDB
Make sure MongoDB is running. If not installed, you can use MongoDB Atlas (free cloud option).

### 4. Seed Database (Optional)
```bash
npm run seed
```
This will populate your database with 8 sample watch products.

### 5. Start the Server
```bash
npm run dev
```

The server will start on `http://localhost:4000`

## Testing the API

### 1. Register a User
```bash
POST http://localhost:4000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123",
  "name": "Test User"
}
```

### 2. Login
```bash
POST http://localhost:4000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

Save the `token` from the response.

### 3. Get Products
```bash
GET http://localhost:4000/api/products
```

### 4. Add to Cart (requires token)
```bash
POST http://localhost:4000/api/cart
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "productId": "PRODUCT_ID_FROM_STEP_3",
  "quantity": 1
}
```

### 5. Create Order
```bash
POST http://localhost:4000/api/orders
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

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

## Common Issues

### MongoDB Connection Error
- Make sure MongoDB is running
- Check your `MONGODB_URI` in `.env`
- For MongoDB Atlas, use the connection string from your cluster

### Port Already in Use
- Change `PORT` in `.env` to a different port (e.g., 4001)
- Or stop the process using port 4000

### Module Not Found Errors
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then run `npm install`

## Next Steps

1. Connect your frontend to these API endpoints
2. Update frontend to use the backend API instead of localStorage
3. Add environment variables for production
4. Set up proper error handling and validation

