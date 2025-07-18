<div align="center">
  <h1>Kosh Enterprise Resource Platform</h1>
  <p>
    A unified, dual-function platform designed to seamlessly manage both an enterprise's intellectual resources (Library) and its physical assets (Asset Management).
  </p>

  <!-- Badges -->
  <p>
    <a href="https://github.com/PrakharSinghal07/Kosh/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/PrakharSinghal07/Kosh?style=for-the-badge" alt="license" />
    </a>
    <a href="https://github.com/PrakharSinghal07/Kosh/commits/main">
      <img src="https://img.shields.io/github/last-commit/PrakharSinghal07/Kosh?style=for-the-badge&logo=git&logoColor=white" alt="last-commit" />
    </a>
    <a href="https://github.com/PrakharSinghal07/Kosh">
      <img src="https://img.shields.io/github/languages/top/PrakharSinghal07/Kosh?style=for-the-badge" alt="repo-top-language" />
    </a>
  </p>
</div>

---

## 📑 Table of Contents

1. [About The Project](#1-about-the-project)  
2. [Live Demo](#2-live-demo)  
3. [Key Features](#3-key-features)  
4. [Technology Stack](#4-technology-stack)  
5. [Local Development Setup](#5-local-development-setup)  
6. [Environment Variables](#6-environment-variables)  
7. [Contributing](#7-contributing)  
8. [License](#8-license)  
9. [Contact](#9-contact)  

---

## 1) 📘 About The Project

In many organizations, the systems used to manage physical inventory (like laptops and equipment) are completely separate from those managing knowledge resources (like a corporate library). This separation creates data silos and inefficiencies.

**Kosh** was built to solve this problem. It offers a single, cohesive, and secure platform that integrates two key enterprise functions:

- 📚 **Library Management System**  
- 💻 **Asset Management System**

By unifying these systems, **Kosh** reduces administrative overhead, enhances the user experience, and provides a single source of truth for all enterprise resources.

---

## 2) 🚀 Live Demo

- **Frontend** (Netlify): [https://kosh-erp.netlify.app](https://kosh-erp.netlify.app)  
- **Backend** (Render): [https://library-management-system-v294.onrender.com](https://library-management-system-v294.onrender.com)

---

## 3) ✨ Key Features

<details>
  <summary><strong>🛡️ Platform-Wide Features</strong></summary>

- 🔐 JWT-based secure authentication (HTTP-only cookies)
- 👤 Role-Based Access Control (Admin & Employee)
- 🔁 Forgot Password & OTP-based Reset
- 🏠 Unified Dashboard with clean UI
- 📱 Fully responsive design across devices

</details>

<details>
  <summary><strong>📚 Library Management Module</strong></summary>

- 📖 CRUD operations for books (Admin only)
- 🌄 Cloudinary integration for book image uploads
- 👥 Borrowing and member management (Admin)
- 🕵️ Public browsing of catalog
- 📊 Users can view borrowing history and status

</details>

<details>
  <summary><strong>💻 Asset Management Module</strong></summary>

- 🖥️ Full asset inventory CRUD (Admin only)
- 🔁 Assign/Return lifecycle management
- 🧭 Dashboard overview of all asset statuses
- 👔 "My Assets" portal for employees

</details>

---

## 4) 🧰 Technology Stack

### Frontend:
- React.js (Vite)
- Tailwind CSS
- Axios
- React Context API

### Backend:
- Node.js + Express.js
- JWT + Cookies for Auth
- Multer + Cloudinary for file uploads
- Nodemailer for email OTP

### Database & Deployment:
- MongoDB with Mongoose ODM
- Netlify (Frontend) & Render (Backend)

---

## 5) ⚙️ Local Development Setup

### 🧾 Prerequisites
- Node.js (v14+)
- npm or yarn
- Git

### 🛠️ Installation

Clone the repository:

```bash
git clone https://github.com/your-username/kosh.git
cd kosh
```

### Setup Backend:

```bash
cd server
npm install
# Add your .env file
npm start
```

### Setup Frontend:

```bash
cd ../client
npm install
# Add your .env file
npm run dev
```

The app should be running at **http://localhost:5173**

---

## 6) 🔐 Environment Variables

<details>
  <summary><strong>server/.env</strong></summary>

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_very_strong_and_long_random_secret_key
FRONTEND_URL=http://localhost:5173

# Cloudinary
CLOUDINARY_CLIENT_NAME=your_cloudinary_cloud_name
CLOUDINARY_CLIENT_API=your_cloudinary_api_key
CLOUDINARY_CLIENT_SECRET=your_cloudinary_api_secret

# Email Config
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your_app_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```
</details>

<details>
  <summary><strong>client/.env</strong></summary>

```env
VITE_API_URL=http://localhost:5000
```

</details>

---

## 7) 🤝 Contributing

Contributions are what make the open-source community amazing 💙

To contribute:

```bash
# Fork the repo
git checkout -b feature/AmazingFeature
git commit -m 'feat: Add some AmazingFeature'
git push origin feature/AmazingFeature
# Open a Pull Request
```

Or simply open an issue with the tag `enhancement`.

---

## 8) 📄 License

Distributed under the **MIT License**.  
See [`LICENSE`](https://github.com/PrakharSinghal07/Kosh/blob/master/LICENSE) for more information.

---

## 9) 📬 Contact

**Prakhar Singhal** – [linkedin.com/in/prakhar-singhal-ln](linkedin.com/in/prakhar-singhal-ln)  
📧 prakharsinghalrishu@gmail.com
🔗 [https://github.com/PrakharSinghal07/Kosh](https://github.com/PrakharSinghal07/Kosh)

---

> ✨ Built with love and purpose to unify enterprise knowledge and asset management.