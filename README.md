# 🎨 PaletteFolio

PaletteFolio is a **full-stack MERN application** that allows developers and designers to explore, preview, **customize**, and save modern color palettes for portfolio websites.

Users can browse curated system themes, see how each palette looks on a mock portfolio layout and after authentication  **create their own custom themes with live preview**, then save them to a personal dashboard.

This project is built with real-world SaaS architecture in mind, including authentication, protected routes, and user-specific data storage.

---

## 🚀 Features

* 🌈 Browse curated color palettes
* 👀 Live portfolio preview for every theme
* 🔐 JWT-based authentication (Login & Register)
* 🛡️ Protected routes and actions
* ✍️ **Create custom color themes**
* ⚡ **Real-time live preview while customizing themes**
* 💾 Save curated and custom themes to a personal dashboard
* 🗑️ Delete saved themes
* 📱 Fully responsive UI

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* Context API

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

### Architecture

* RESTful APIs
* Protected Routes
* User-specific data handling

---

## 📁 Project Structure

```text
PaletteFolio/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.jsx
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── seeder.js
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* MongoDB (local or Atlas)
* npm

---

### 🔧 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

(Optional) Seed initial system themes:

```bash
node seeder.js
```

Start the backend server:

```bash
npm start
```

Backend runs at:

```
http://localhost:5000
```

---

### 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔐 Authentication Flow

* Users can browse themes without logging in
* Login/Register to unlock:

  * Copy color codes
  * Save themes
  * Create custom themes
  * Access dashboard
* JWT is stored securely and used for protected API routes

---

## 🧠 Key Learning Outcomes

* Full-stack MERN development
* Authentication & authorization with JWT
* Context API for global state management
* REST API design and integration
* Real-time UI updates with live previews
* Clean and scalable project structure

---

## 📌 Future Enhancements

* Theme sharing via public links
* Export palettes as CSS / JSON
* Dark mode toggle
* Drag-and-drop color editor
* User profile customization

---

⭐ If you like this project, consider giving it a star on GitHub!
