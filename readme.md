# Adeniyi's Blog API

A RESTful blogging API built with **Node.js**, **Express**, and **MongoDB**, allowing users to sign up, create and manage blog posts, and publish them to the public. Built using the MVC pattern and secured with **JWT-based authentication**.

## ✨ Features

* ✅ User Signup and Signin
* ✅ JWT Authentication
* ✅ Create, Read, Update, and Delete (CRUD) blog posts
* ✅ Blog post states: `draft` or `published`
* ✅ Authenticated users can manage their own blogs
* ✅ Public access to published blog posts
* ✅ Optional filtering, searching, and pagination (basic implementation)
* 🧪 Route-by-route testing with Jest & Supertest

---

## 🔗 Live Demo

🚧 Deployment pending...
Will be hosted on **PipeOps** or **Heroku**.

---

## 📂 API Endpoints

**Base Path**: `/api/v1/BlogApi`

### Auth Routes

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| POST   | `/auth/signup` | Register a new user |
| POST   | `/auth/signin` | Login and get token |

### Blog Routes (Protected)

| Method | Endpoint             | Description                      |
| ------ | -------------------- | -------------------------------- |
| POST   | `/blogs`             | Create a blog (draft by default) |
| GET    | `/blogs/me`          | View all blogs by logged-in user |
| GET    | `/blogs/:id`         | Get a specific blog post         |
| PATCH  | `/blogs/:id`         | Update a blog post               |
| PATCH  | `/blogs/:id/publish` | Publish a blog                   |
| DELETE | `/blogs/:id`         | Delete a blog post               |

### Public Blog Routes

| Method | Endpoint | Description              |
| ------ | -------- | ------------------------ |
| GET    | `/blogs` | View all published blogs |

---

## 🛠️ Tech Stack

* **Backend**: Node.js, Express
* **Database**: MongoDB, Mongoose
* **Authentication**: JWT
* **Testing**: Jest, Supertest
* **Dev Tools**: Nodemon, dotenv, cross-env

---

## 🛆 Installation

```bash
git clone https://github.com/your-username/adeniyi-blog-api.git
cd adeniyi-blog-api
npm install
```

Create a `.env` file in the root directory and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

---

## 🚀 Usage

```bash
npm run dev     # Starts server in development mode
npm start       # Starts server in production mode
npm test        # Run all tests
```

---


## 📬 API Testing Collection

📬 **Postman Collection:** https://drive.google.com/file/d/1f4XAcvGvgdWdmbL__CvFOM5RwVIhDk8f/view?usp=drive_link

---

## 👨🏾‍💻 Author

**Adeniyi Anjorin**

> Backend Developer | Node.js | MongoDB

---

## 📃 License

This project is licensed under the [MIT License](LICENSE).
