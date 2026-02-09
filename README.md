# SAMAY - Watch Store E-Commerce Platform

<div align="center">

![SAMAY Logo](frontend/src/components/logo/Rolex-logo.png)

**A modern, full-stack e-commerce platform for luxury watches built with MERN stack**

[Features](#features) • [Tech Stack](#tech-stack) • [Installation](#installation) • [Usage](#usage) • [API Documentation](#api-endpoints)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Admin Setup](#admin-setup)
- [Available Scripts](#available-scripts)
- [Database Schema](#database-schema)

---

## 🎯 Overview

**SAMAY** is a full-featured e-commerce platform specializing in luxury watches. The application provides a seamless shopping experience with user authentication, product browsing, shopping cart management, favorites, order processing, and an admin dashboard for managing products and viewing analytics.

### Key Highlights

- ✨ Modern, responsive UI built with React and Tailwind CSS
- 🔐 Secure authentication with JWT tokens
- 🛒 Real-time cart and favorites synchronization
- 👑 Admin dashboard with analytics and product management
- 📱 Mobile-responsive design
- 🚀 Fast and optimized with Vite
- 🗄️ MongoDB for scalable data storage

---

## ✨ Features

### Customer Features
- **User Authentication**: Register and login with secure JWT-based authentication
- **Product Browsing**: Browse watches by brand, category, and gender
- **Product Search & Filter**: Filter products by brand, category, price range
- **Shopping Cart**: Add items to cart with quantity management
- **Favorites**: Save favorite products for quick access
- **Product Comparison**: Compare up to 3 products side-by-side
- **Order Management**: Place orders and track order history
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### Admin Features
- **Dashboard**: View sales statistics, revenue, and inventory metrics
- **Product Management**: Add, edit, and delete products
- **Order Management**: View and manage customer orders
- **User Management**: View registered users
- **Analytics**: Real-time insights into store performance

---

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Leaflet** - Maps integration

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher) or **yarn**
- **MongoDB** (v5 or higher) - [Install MongoDB](https://www.mongodb.com/try/download/community)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd project
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## ⚙️ Environment Variables

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# MongoDB Connection
MONGO_URI=mongodb://127.0.0.1:27017/samay

# Server Port
PORT=5000

# JWT Secret (use a strong random string in production)
JWT_SECRET=your-secret-key-change-this-in-production
```

### Frontend Environment Variables (Optional)

Create a `.env` file in the `frontend` directory (if needed):

```env
VITE_API_URL=http://localhost:5000/api
```

---

## ▶️ Running the Application

### Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
# or
mongod
```

### Start Backend Server

```bash
cd backend
npm start
```

The backend server will start on `http://localhost:5000`

### Start Frontend Development Server

Open a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

---

## 📁 Project Structure

```
project/
├── backend/                    # Backend API Server
│   ├── SAMAY.js               # Main entry point
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── middleware/
│   │   ├── auth.js            # Authentication middleware
│   │   └── adminAuth.js       # Admin authentication middleware
│   ├── models/                # Mongoose models
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   ├── Favorite.js
│   │   ├── Order.js
│   │   └── Complaint.js
│   ├── routes/                # API routes
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── productRoutes.js
│   │   ├── favoriteRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── userRoutes.js
│   │   ├── complaintRoutes.js
│   │   └── adminRoutes.js
│   ├── scripts/               # Utility scripts
│   │   ├── createAdmin.js
│   │   ├── updateUserToAdmin.js
│   │   ├── listUsers.js
│   │   └── fixFavoriteIndexes.js
│   └── package.json
│
└── frontend/                   # React Frontend
    ├── src/
    │   ├── components/        # React components
    │   │   ├── Home.tsx
    │   │   ├── Products.tsx
    │   │   ├── Cart.tsx
    │   │   ├── Login.tsx
    │   │   ├── AdminDashboard.tsx
    │   │   └── ...
    │   ├── pages/             # Page components
    │   │   ├── MyOrders.tsx
    │   │   ├── OrderSuccess.tsx
    │   │   └── Compare.tsx
    │   ├── context/           # React Context
    │   │   └── AuthContext.tsx
    │   ├── utils/             # Utility functions
    │   │   ├── api.ts
    │   │   └── checkAdmin.ts
    │   ├── data/              # Static data
    │   │   └── watches.json
    │   ├── App.tsx            # Main App component
    │   └── main.tsx           # Entry point
    └── package.json
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart
- `GET /api/carts/user/:userId` - Get user's cart
- `POST /api/carts/add` - Add item to cart
- `PUT /api/carts/update` - Update cart item quantity
- `POST /api/carts/remove` - Remove item from cart

### Favorites
- `GET /api/favorites/user/:userId` - Get user's favorites
- `POST /api/favorites/toggle` - Toggle favorite (add/remove)
- `POST /api/favorites/remove` - Remove favorite

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `DELETE /api/orders/:id` - Delete order

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

### Complaints
- `POST /api/complaints` - Submit complaint
- `GET /api/complaints` - Get all complaints
- `GET /api/complaints/:id` - Get complaint by ID
- `DELETE /api/complaints/:id` - Delete complaint

### Admin
- `GET /api/admin/stats` - Get dashboard statistics (Admin only)

---

## 👑 Admin Setup

### Method 1: Using Script (Recommended)

```bash
cd backend
npm run create-admin
```

This creates an admin user with:
- **Email**: `admin@samay.com`
- **Password**: `admin123`

### Method 2: Custom Admin User

```bash
cd backend
npm run create-admin admin@example.com mypassword123 "Admin Name"
```

### Method 3: Update Existing User

```bash
cd backend
npm run update-admin user@example.com
```

### Access Admin Dashboard

1. Login with admin credentials at `/login`
2. Navigate to `/admin` for dashboard
3. Navigate to `/admin/products` for product management

For detailed admin setup instructions, see [backend/ADMIN_SETUP.md](backend/ADMIN_SETUP.md)

---

## 📜 Available Scripts

### Backend Scripts

```bash
# Start server
npm start

# Start development server
npm run dev

# Create admin user
npm run create-admin [email] [password] [name]

# Update user to admin
npm run update-admin <email>

# List all users
npm run list-users

# Fix favorite indexes
npm run fix-favorite-indexes
```

### Frontend Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 🗄️ Database Schema

### Collections

- **users**: User accounts with authentication
- **products**: Watch products with details
- **carts**: Shopping carts for each user
- **favorites**: User's favorite products
- **orders**: Customer orders
- **complaints**: Customer complaints/contact messages

### Database Name

`samay`

---

## 🎨 Key Features Explained

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (User/Admin)
- Protected routes on frontend
- Secure password hashing with bcrypt

### Shopping Experience
- Persistent cart and favorites synced with MongoDB
- Real-time UI updates
- Product comparison feature
- Brand-specific product pages

### Admin Dashboard
- Real-time statistics (revenue, orders, products)
- Product CRUD operations
- Order management
- User management

---

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS configuration
- Input validation
- Protected admin routes
- Secure API endpoints

---

## 📝 Notes

- The application uses MongoDB as the database. Make sure MongoDB is running before starting the backend.
- All sensitive data (passwords, tokens) are properly hashed and secured.
- The frontend connects to `http://localhost:5000/api` by default. Update `VITE_API_URL` if using a different backend URL.
- Admin routes require authentication with an admin role.

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod` or `sudo systemctl start mongod`
- Check `MONGO_URI` in `.env` file
- Verify MongoDB is accessible on the specified port (default: 27017)

### Port Already in Use
- Change `PORT` in backend `.env` file
- Kill the process using the port: `lsof -ti:5000 | xargs kill` (macOS/Linux)

### CORS Errors
- Verify backend CORS origin matches frontend URL
- Check `cors({ origin: 'http://localhost:5173' })` in `SAMAY.js`

---

## 📄 License

This project is licensed under the ISC License.

---

## 👤 Author

**SAMAY Watch Store**

---

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by luxury watch e-commerce platforms
- Clean architecture and best practices

---

<div align="center">

**Made with ❤️ using MERN Stack**

[Back to Top](#samay---watch-store-e-commerce-platform)

</div>
