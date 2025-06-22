# 🎬 Netflix Clone with AI Movie Recommendations

A full-stack Netflix-inspired web application with **secure user authentication**, **dynamic AI-powered movie recommendations**, and a **modern UI**. Built using the MERN stack, Zustand, Tailwind CSS, and integrated with **Google Gemini (`gemini-2.0-flash`)** for personalized suggestions.

---

## 🚀 Live Demo

Frontend: [https://netflix-clone-1-j5al.onrender.com](https://netflix-clone-1-j5al.onrender.com)
Backend: [https://netflix-clone-iim8.onrender.com](https://netflix-clone-iim8.onrender.com)

---

## 🧰 Tech Stack

### 🌐 Frontend

* [React.js](https://react.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Zustand](https://github.com/pmndrs/zustand)
* [Axios](https://axios-http.com/)
* [Vite](https://vitejs.dev/)
* [react-hot-toast](https://react-hot-toast.com/)
* [DiceBear API](https://www.dicebear.com/) – for profile avatars

### 🧠 AI Integration

* [Google Gemini API (gemini-2.0-flash)](https://ai.google.dev/)

  * Generates a list of movie recommendations based on:

    * 🎭 Genre
    * 🎞️ Decade
    * 😄 Mood
    * 🌍 Language
    * ⏱️ Length

### 🔐 Backend

* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
* [Mongoose](https://mongoosejs.com/)
* [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
* [cookie-parser](https://github.com/expressjs/cookie-parser)
* [dotenv](https://github.com/motdotla/dotenv)
* [cors](https://github.com/expressjs/cors)

---

## 🔐 Authentication & Security

* **Signup/Login** with hashed passwords
* **JWT** authentication via **HTTP-only cookies**
* Cookie settings:

  ```js
  {
    httpOnly: true,
    secure: true,
    sameSite: "None"
  }
  ```
* Cross-Origin credentials enabled for frontend/backend hosted on Render

---

## ✨ Features

* ✅ User Signup & Login
* ✅ AI-Powered Movie Recommendations
* ✅ Cookie-based Persistent Auth
* ✅ DiceBear Avatar Integration
* ✅ Logout Functionality
* ✅ Dynamic Progress Indicator
* ✅ Clean, Responsive UI with Tailwind

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/netflix-ai-clone.git
cd netflix-ai-clone
```

### 2. Set up Backend

```bash
cd backend
npm install
```

#### Create a `.env` file:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=https://your-frontend-url.onrender.com
```

```bash
npm run start
```

### 3. Set up Frontend

```bash
cd ../frontend
npm install
```

#### Create a `.env` file:

```
VITE_GOOGLE_GENAI_API_KEY=your_google_genai_api_key
```

```bash
npm run dev
```

---

## 📸 Preview

Here is a preview of the AI-powered Netflix Clone:

![Homepage Screenshot](./src/screenshots/homepage.png)

---

## 🧠 AI Prompt Example

> Sent to Gemini:

```txt
Given the following user inputs:
- Decade: 2000s
- Genre: Comedy
- Mood: Relaxed
- Language: English
- Length: Medium (90-120 min)

Recommend 10 relaxed English comedy movies from the 2000s that are medium length. Return the list as a plain JSON array of movie titles only, no extra text or formatting.
```

---

## 📆 Hosting Info

* **Frontend:** Render (Static Site)
* **Backend:** Render (Node Web Service)
* **MongoDB Atlas:** Database with static IP whitelisting
* **Static Outbound IPs** used for DB access:


## 📚 License

This project is open source under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

* Netflix UI inspiration
* DiceBear for avatar API
* Google Gemini API for AI movie recommendations
