# 📚 Library Management System – BookWorm

A full-stack Library Management System to manage users, books, borrowing activities, and admin operations. Built with a React frontend and Node.js/Express backend, connected to a MongoDB database.

---

## 🌐 Live Demo

**Frontend (Netlify)**: [BookWorm UI](https://bookworm-thelibrary-management-system.netlify.app)


---

## 🚀 Tech Stack

**Frontend**:
- Vite + React
- Axios for API calls
- React Router

**Backend**:
- Node.js + Express
- MongoDB + Mongoose
- JWT-based Auth (with HTTP-only cookies)
- Cloudinary (for book image upload)

**Deployment**:
- Frontend: Netlify
- Backend: Render

---

## 📌 Features

### 👤 User Authentication
- Register / Login with JWT + Cookies
- Protected routes
- Admin vs normal user access

### 📚 Book Management
- Add, edit, delete books (admin)
- Browse books (public)
- Book cover upload using Cloudinary

### 🔄 Borrow System
- Borrow and return books
- Prevent duplicate or conflicting borrows
- Notify users for overdue books

### 🛠 Admin Panel
- View all users
- Delete unverified users
- Notifications for expiring/borrowed books

---

## 🛠️ Installation & Setup (Local)

```bash
# 1. Clone the repo
git clone https://github.com/your-username/Library-Management-System.git
cd Library-Management-System

# 2. Setup server
cd server
npm install
# Create a .env file with required environment variables
npm start

# 3. Setup client
cd ../client
npm install
npm run dev
