<div align="center">
  <h1>Kosh Enterprise Resource Platform</h1>
  <p>
    A comprehensive, unified platform designed to manage your enterprise’s intellectual assets, physical inventory, employee lifecycle, and audit trails — all in one place.
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

Most enterprises struggle with disconnected systems managing their physical inventory, intellectual resources, employee data, and compliance logs. This causes silos, inefficiencies, and risk.

**Kosh** is engineered to break these silos by offering a single, integrated, and secure platform that empowers your organization with:

- 📚 **Library Management**: Streamline corporate knowledge sharing and book inventory  
- 💻 **Asset Management**: Track, assign, and maintain your physical assets seamlessly  
- 👥 **Employee Lifecycle Management**: Automate onboarding, updates, and offboarding processes  
- 🕵️ **Audit Trails & Compliance**: Maintain full visibility into platform activities for security and accountability  

By unifying these critical enterprise functions, Kosh reduces operational overhead, improves data integrity, and enhances user experience — all wrapped in a scalable, modern UI.

---

## 2) 🚀 Live Demo

- **Frontend** (Netlify): [https://kosh-erp.netlify.app](https://kosh-erp.netlify.app)  
- **Backend** (Render): [https://library-management-system-v294.onrender.com](https://library-management-system-v294.onrender.com)

---

## 3) ✨ Key Features

<details>
  <summary><strong>🛡️ Platform-Wide Features</strong></summary>

- 🔐 Robust JWT authentication with HTTP-only cookies for maximum security  
- 👤 Role-Based Access Control (Admin, HR, Employee roles)  
- 🔁 Password reset with OTP via email  
- 🏠 Unified, intuitive dashboard consolidating all modules  
- 📱 Fully responsive and accessible UI across devices  
- 🕵️ Comprehensive audit logging capturing all critical actions  
</details>

<details>
  <summary><strong>📚 Library Management Module</strong></summary>

- 📖 Full CRUD for book inventory with cover image uploads via Cloudinary  
- 👥 Member management and borrowing lifecycle  
- 🕵️ Public-facing catalog browsing with search and filters  
- 📊 Historical borrowing analytics for users and admins  
</details>

<details>
  <summary><strong>💻 Asset Management Module</strong></summary>

- 🖥️ Track asset lifecycle: procurement, assignment, returns, and disposals  
- 👔 "My Assets" portal for employees to view assigned items  
- 📈 Dashboard for real-time asset status and alerts  
- 🔁 Asset transfers and condition tracking  
</details>

<details>
  <summary><strong>👥 Employee Lifecycle Management Module</strong></summary>

- 📝 Automated onboarding workflows with role & department assignment  
- 🛠️ Manage employee profiles, promotions, and transfers  
- 📅 Track leaves, attendance, and exit processes  
- 🔐 HR role with elevated access and audit visibility  
</details>

<details>
  <summary><strong>🕵️ Audit Trails & Compliance</strong></summary>

- 📋 Centralized logging of all create, update, delete, and login actions  
- 🔎 Filterable and paginated audit logs with user and target info  
- 🛡️ Role-based access to sensitive logs ensuring compliance  
- 📅 Time-stamped entries for full traceability  
</details>

---

## 4) 🧰 Technology Stack

### Frontend:
- React.js (Vite) — lightning-fast and modular  
- Tailwind CSS — modern utility-first styling  
- Axios — API communication  
- React Context API — state management  

### Backend:
- Node.js + Express.js — scalable RESTful APIs  
- JWT + HTTP-only Cookies — secure authentication  
- Multer + Cloudinary — image and file uploads  
- Nodemailer — email OTP system  

### Database & Deployment:
- MongoDB with Mongoose ODM — flexible document database  
- Netlify — frontend hosting  
- Render — backend hosting  


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