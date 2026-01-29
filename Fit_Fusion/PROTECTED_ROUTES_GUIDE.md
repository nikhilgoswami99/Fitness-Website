# 🔐 Protected Routes & Authentication Guide

## 📋 Overview
This guide explains how protected routes and authentication work in your Fitness Website.

---

## 🎯 What Was Implemented

### 1. **Protected Routes**
- Only logged-in users can access certain pages
- Protected pages: Profile, Diet, Saved Workouts
- Public pages: Home, Workouts, Sign In, Sign Up

### 2. **Conditional Navbar**
- Shows different links based on login status
- **When logged in**: Shows Home, Diet, Profile, Saved Workouts
- **When logged out**: Shows Home, Sign In, Register

### 3. **Toast Notifications**
- Success messages for login, signup, logout
- Error messages for failed operations
- Form validation messages

---

## 🗂️ File Structure

```
src/
├── components/
│   └── ProtectedRoute.jsx          # Protects routes from unauthorized access
├── context/
│   └── userContext.jsx              # Global user state management
├── pages/
│   ├── signIn/signIn.jsx            # Login page with toast notifications
│   ├── signUp/signUp.jsx            # Registration page with auto-login
│   └── profile/profile.jsx          # Profile page with logout
├── services/
│   └── appwrite.js                  # Authentication functions
└── main.jsx                         # Route configuration
```

---

## 🔧 How It Works

### **ProtectedRoute Component**
```jsx
// Simple protection logic:
1. Check if user is logged in
2. If YES → Show the page
3. If NO → Show toast notification → Redirect to login
```

**Location**: `src/components/ProtectedRoute.jsx`

**How to use**:
```jsx
<ProtectedRoute>
  <YourPage />
</ProtectedRoute>
```

---

### **User Context (Global State)**
Manages user authentication across the entire app.

**Location**: `src/context/userContext.jsx`

**What it provides**:
- `user` - Current user data
- `isAuthenticated` - Boolean (true if logged in)
- `isLoading` - Boolean (true while checking auth)
- `setUser(userData)` - Update user data
- `clearUser()` - Clear user data (for logout)
- `checkUserSession()` - Check if user is logged in

**How to use in any component**:
```jsx
import { useUser } from '../context/userContext.jsx';

function MyComponent() {
  const { user, isAuthenticated, setUser, clearUser } = useUser();
  
  if (isAuthenticated) {
    return <p>Welcome, {user.fullName}!</p>;
  }
  
  return <p>Please log in</p>;
}
```

---

## 📝 Step-by-Step User Flow

### **Sign Up Flow**
1. User fills registration form
2. Form validates inputs (all fields required, password ≥ 8 chars)
3. Creates account in Appwrite
4. Automatically logs in the user
5. Updates global user state
6. Shows success toast: "Welcome to FitFreak, [Name]!"
7. Navigates to Profile page

### **Sign In Flow**
1. User enters email and password
2. Form validates inputs
3. Logs in via Appwrite
4. Gets user data from database
5. Updates global user state
6. Shows success toast: "Welcome back, [Name]!"
7. Navigates to Profile page

### **Logout Flow**
1. User clicks Logout button
2. Logs out from Appwrite
3. Clears global user state
4. Shows success toast: "Logged out successfully!"
5. Navigates to Login page

### **Protected Page Access**
1. User tries to access protected page (e.g., /profile)
2. ProtectedRoute checks if user is logged in
3. **If logged in**: Shows the page
4. **If not logged in**: 
   - Shows error toast: "Please login to access this page!"
   - Redirects to /login

---

## 🎨 Toast Notifications

All notifications use `react-toastify` with dark theme.

**Success Examples**:
- ✅ "Welcome back, John!"
- ✅ "Welcome to FitFreak, John!"
- ✅ "Logged out successfully!"

**Error Examples**:
- ❌ "Please fill in all fields!"
- ❌ "Password must be at least 8 characters long!"
- ❌ "Login failed: Invalid credentials"
- ❌ "Please login to access this page!"

---

## 🛣️ Route Configuration

**Public Routes** (Anyone can access):
```jsx
/ (Home)
/workouts/:workoutType
/login
/register
```

**Protected Routes** (Login required):
```jsx
/profile
/diet
/savedWorkouts
```

---

## 🧪 Testing Guide

### **Test Protected Routes**:
1. **While logged out**, try to access:
   - `/profile` → Should redirect to `/login` with toast
   - `/diet` → Should redirect to `/login` with toast
   - `/savedWorkouts` → Should redirect to `/login` with toast

2. **After logging in**, try to access:
   - `/profile` → Should work ✅
   - `/diet` → Should work ✅
   - `/savedWorkouts` → Should work ✅

### **Test Navbar**:
1. **While logged out**, navbar should show:
   - Home, Sign In, Register

2. **While logged in**, navbar should show:
   - Home, Diet, Profile, Saved Workouts

### **Test Authentication Flow**:
1. Sign up with new account → Should auto-login and redirect to profile
2. Log out → Should redirect to login page
3. Log in → Should redirect to profile page
4. Refresh page → Should stay logged in (session persists)

---

## 💡 Tips for Beginners

### **Understanding the Flow**:
```
User Context (Global State)
    ↓
ProtectedRoute (Checks if logged in)
    ↓
Your Page (Shows only if authenticated)
```

### **Key Concepts**:
1. **Context API** = Global state (like a shared memory for the whole app)
2. **Protected Route** = A guard that checks if you're logged in
3. **Toast** = Pop-up notification message
4. **Navigate** = Programmatically change the page

### **Common Patterns**:

**Check if user is logged in**:
```jsx
const { isAuthenticated } = useUser();

if (isAuthenticated) {
  // User is logged in
} else {
  // User is NOT logged in
}
```

**Get current user data**:
```jsx
const { user } = useUser();

console.log(user.fullName);  // "John Doe"
console.log(user.email);     // "john@example.com"
```

**Update user after login**:
```jsx
const { setUser } = useUser();

// After successful login
const userData = await getCurrentUser();
setUser(userData);
```

**Clear user on logout**:
```jsx
const { clearUser } = useUser();

// When logging out
await logoutUser();
clearUser();
```

---

## 🚀 Next Steps

You can now:
1. ✅ Add more protected routes easily
2. ✅ Show/hide UI elements based on auth status
3. ✅ Display user-specific data
4. ✅ Add role-based access control

**Example - Add a new protected route**:
```jsx
// In main.jsx
{
  path: "settings",
  element: (
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  ),
}
```

**Example - Show content only to logged-in users**:
```jsx
const { isAuthenticated } = useUser();

return (
  <div>
    {isAuthenticated ? (
      <button>Save Workout</button>
    ) : (
      <p>Login to save workouts</p>
    )}
  </div>
);
```

---

## 📚 Summary

✅ Protected routes prevent unauthorized access
✅ User context manages global authentication state
✅ Toast notifications provide user feedback
✅ Navbar changes based on login status
✅ Easy to understand, beginner-friendly code
✅ All authentication flows are complete

**You're all set! 🎉**
