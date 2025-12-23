# Route Protection Implementation Guide

## Overview
Route protection has been implemented to secure your e-commerce application. Users must be authenticated to access protected routes like Cart, Payment, and Favorites.

## What Was Implemented

### 1. **Authentication Context** (`src/context/AuthContext.tsx`)
- Manages user authentication state globally
- Handles login, register, and logout
- Stores JWT token and user info in localStorage
- Provides `useAuth` hook for components

### 2. **Protected Route Component** (`src/components/ProtectedRoute.tsx`)
- Wraps routes that require authentication
- Redirects unauthenticated users to login page
- Preserves the intended destination for redirect after login

### 3. **API Utility** (`src/utils/api.ts`)
- Centralized API request handler
- Automatically adds JWT token to requests
- Handles 401 errors (unauthorized) by clearing auth and redirecting

### 4. **Updated Components**

#### Login Component
- Now connects to backend API
- Shows error messages
- Redirects to intended page after login
- Loading states during authentication

#### Header Component
- Shows user name/email when authenticated
- Displays logout button
- Shows login button when not authenticated

#### Products Component
- Checks authentication before adding to cart
- Checks authentication before adding to favorites
- Redirects to login if user is not authenticated

#### App Component
- Wrapped with `AuthProvider`
- Protected routes: `/cart`, `/payment`, `/favorites`

## Protected Routes

The following routes now require authentication:

1. **`/cart`** - Shopping cart page
2. **`/payment`** - Payment/checkout page
3. **`/favorites`** - Favorites/wishlist page

## How It Works

### User Flow

1. **Unauthenticated User tries to access `/cart`**:
   - `ProtectedRoute` detects user is not authenticated
   - Redirects to `/login` with return path stored
   - After login, user is redirected back to `/cart`

2. **User adds product to cart without login**:
   - `Products` component checks authentication
   - If not authenticated, redirects to login
   - After login, user can add to cart

3. **User logs in**:
   - Token stored in localStorage
   - User info stored in localStorage
   - AuthContext updates global state
   - User can now access protected routes

4. **User logs out**:
   - Token and user info cleared
   - Cart and favorites cleared from localStorage
   - Redirected to home page

## Environment Variables

Make sure to set the API URL in your `.env` file:

```env
VITE_API_URL=http://localhost:4000/api
```

If not set, it defaults to `http://localhost:4000/api`.

## Testing the Protection

### Test Case 1: Access Cart Without Login
1. Make sure you're logged out
2. Try to navigate to `/cart`
3. Should redirect to `/login`
4. After login, should redirect back to `/cart`

### Test Case 2: Add to Cart Without Login
1. Make sure you're logged out
2. Go to `/products`
3. Click "Add to Cart" on any product
4. Should redirect to `/login`
5. After login, should return to `/products`

### Test Case 3: Access Payment Without Login
1. Make sure you're logged out
2. Try to navigate to `/payment`
3. Should redirect to `/login`

### Test Case 4: Logout
1. Login to your account
2. Click logout button in header
3. Should clear session and redirect to home
4. Try accessing `/cart` - should redirect to login

## Security Features

1. **JWT Token Storage**: Tokens stored in localStorage
2. **Automatic Token Injection**: API requests automatically include token
3. **Token Expiration Handling**: Backend validates token expiration
4. **Unauthorized Handling**: 401 responses clear auth and redirect
5. **Route Guards**: Protected routes check authentication before rendering

## Backend Integration

The frontend now connects to your backend API:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- All protected routes require `Authorization: Bearer <token>` header

## Next Steps (Optional Enhancements)

1. **Token Refresh**: Implement token refresh before expiration
2. **Remember Me**: Add "remember me" functionality
3. **Session Management**: Add session timeout warnings
4. **Role-Based Access**: Add admin/user role checks
5. **Social Login**: Integrate Google/Facebook OAuth (already has UI placeholders)

## Troubleshooting

### Issue: "Cannot read property 'user' of undefined"
- Make sure `AuthProvider` wraps your entire app in `App.tsx`

### Issue: Redirect loop
- Check that login route is not protected
- Verify API URL is correct in `.env`

### Issue: Token not being sent
- Check browser localStorage for 'token'
- Verify API utility is using token correctly

### Issue: Backend returns 401
- Token might be expired
- Check JWT_SECRET matches between frontend and backend
- Verify token format in Authorization header

## Files Modified/Created

**Created:**
- `src/context/AuthContext.tsx`
- `src/components/ProtectedRoute.tsx`
- `src/utils/api.ts`

**Modified:**
- `src/App.tsx` - Added AuthProvider and ProtectedRoute
- `src/components/Login.tsx` - Connected to backend API
- `src/components/Header.tsx` - Added user info and logout
- `src/components/Products.tsx` - Added auth checks

## Summary

Your application now has complete route protection! Users cannot:
- Access cart without logging in
- Access payment page without logging in
- Access favorites without logging in
- Add items to cart without logging in
- Add items to favorites without logging in

All protected routes automatically redirect to login, and after successful authentication, users are redirected back to their intended destination.

