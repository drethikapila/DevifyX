# DevifyX
A backend banking API system built with Node.js and Sequelize.

# 🏦 DevifyX Banking API

## 🏦 DevifyX Banking API

A backend banking API system built with **Node.js**, **Express**, and **Sequelize**.

---

### 🚀 Features

* User Authentication (JWT-based)
* Create Bank Accounts
* View Account Balance
* Internal & External Transfers
* Scheduled & Recurring Transfers
* Transaction History with Filters and Pagination
* Export Transaction History as CSV
* Swagger API Documentation
* Postman Collection for Testing

---

### 🛠 Tech Stack

* Node.js
* Express.js
* Sequelize (ORM)
* PostgreSQL / MySQL (your choice)
* JWT for Authentication
* Swagger for API Docs
* Postman for Testing

---

### 📦 Installation

```bash
git clone https://github.com/yourusername/DevifyX.git
cd DevifyX
npm install
```

---

### ⚙️ Setup

1. Create a `.env` file:

```env
PORT=3000
DB_NAME=your_db
DB_USER=your_user
DB_PASS=your_password
JWT_SECRET=your_jwt_secret
```

2. Run Sequelize migrations or use `sequelize.sync()`
3. Start the server:

```bash
npm start
```

---

### 🔐 Authentication

All secured endpoints require a JWT token:

* Add `Authorization: Bearer <token>` in headers.

---

### 🔗 API Documentation

Access Swagger docs at:

```
http://localhost:3000/api-docs
```

---

### 📫 Postman Collection

Use the Postman collection `DevifyX.postman_collection.json` to test all endpoints.

Includes:

* Signup & Login
* Create Account
* Transfers (Internal, External, Scheduled)
* Transaction History (with filters)
* CSV Export

---

### 📁 Folder Structure

```
src/
├── controllers/
├── routes/
├── models/
├── services/
├── validations/
├── middlewares/
├── utils/
├── config/
├── swagger/
└── app.js
```

---

### 🤝 Contributing

Pull requests are welcome. Feel free to fork the repo and suggest improvements.

---

### 📄 License

MIT

---

### ✨ Developed By

**Drethi Manish Kapila**

> Web developer | Backend & API Developer
---
