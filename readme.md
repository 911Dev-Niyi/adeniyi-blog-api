# 📝 Adeniyi's Blog API

A RESTful blog API built with **Node.js**, **Express**, and **MongoDB**, following the **MVC architecture**. This project enables user authentication, blog creation, publishing, updating, and deletion with both public and private access layers.

---

## 📌 Features

* **User Authentication**

  * Signup & Login using JWT
* **Blog Management**

  * Create blogs in draft or publish state
  * Update, delete, and view individual blogs
  * View all published blogs (public)
* **Blog Accessibility**

  * Authenticated users can manage their own blogs
  * Anyone can view published blogs
* **Filtering & Sorting**

  * Sort blogs by timestamp
  * Filter by author or title
* **Search & Pagination**

  * Keyword search by title or description
  * Paginate large sets of published blogs
* **Test Coverage**

  * Routes tested using Jest & Supertest (locally)

---

## 🚀 Demo

You can test the live API using the following public endpoint:

> 🟢 **GET All Published Blogs**
> [`https://adeniyi-blog-api.onrender.com/BlogApi/v1/blogs/`](https://adeniyi-blog-api.onrender.com/BlogApi/v1/blogs/)

This will return all published blog posts in JSON format.
Use tools like **Postman**, **Hoppscotch**, or your browser.

---

## 📢 Sample Postman Request

**Example: Creating a New Blog (Draft)**

```
POST /BlogApi/v1/blogs/
Authorization: Bearer <your_token_here>
Content-Type: application/json

{
  "title": "My First Blog Post",
  "description": "This is a test blog post from Postman.",
  "tags": ["test", "postman"],
  "body": "Here’s the content of the blog...",
  "state": "draft"
}
```

Replace `<your_token_here>` with a valid token from your login response.

---

## 💠 Installation

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/adeniyi-blog-api.git
   cd adeniyi-blog-api
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file with the following:

   ```
   PORT=5000
   MONGODB_URI=your-mongodb-connection-uri
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server

   ```bash
   npm run dev
   ```

---

## 🧲 API Testing Collection

Postman collection will be provided soon for easy local or remote testing of all endpoints.

---

## 📜 License

This project is licensed under the MIT License.
