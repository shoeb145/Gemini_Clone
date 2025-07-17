# 💬 Gemini Chat – AI Conversational App

A Gemini-style conversational AI chat app built with React, Zustand, and Tailwind CSS. Users can sign in with OTP, manage chatrooms, and chat with an AI bot. Built with a focus on clean UX, responsiveness, and simulated AI experience.

---

## 🚀 Live Link

🔗 [View Demo](https://gemini-clone-a.netlify.app/)

---

## ✅ Features Implemented

- 📲 **OTP-based Login**

  - Country code selection from REST API
  - Simulated OTP send and verification using `setTimeout`
  - Form validated using **React Hook Form** + **Zod**

- 💬 **Chatroom Interface**

  - Create/Delete chatrooms with confirmation toasts
  - Chat UI with timestamps and mock AI responses
  - “Gemini is typing...” indicator with throttled replies
  - Reverse infinite scroll (pagination: 20 messages per page)
  - Auto-scroll to latest message

- 🌐 **Global UX**
  - Mobile responsive layout
  - Dark mode toggle using **Daisy UI**
  - All state saved to `localStorage`
  - Toast notifications on key actions
  - Keyboard accessible UI

---

## 🛠 Tech Stack

- **React**
- **React Router DOM**
- **Zustand** – Global state management
- **React Hook Form** + **Zod** – Form validation
- **Tailwind CSS + Daisy UI** – Styling
- **Vite** – Build tool

---

## 📂 Folder Structure

├── public/
├── src/
│ ├── assets/ # Images and static files
│ ├── components/ # Reusable components like Navbar, Chat UI
│ ├── lib/ # Zustand stores, utils, validations
│ ├── pages/ # LoginPage, DashboardPage, ChatPage
│ ├── stores/ # Zustand state definitions
│ ├── App.jsx # Main App with Routes
│ └── main.jsx # Entry point
├── tailwind.config.js
├── vite.config.js
└── README.md

yaml
Copy
Edit

---

## 🧠 How It Works

### 🔁 Throttling & Typing Indicator

- Fake delay added using `setTimeout` to simulate "Gemini is typing…" before the AI replies.

### 🗂 Pagination (Client-Side)

- Loads 20 messages at a time on scroll up (reverse infinite scroll).
- Controlled by `page` state and slice logic.

### 📥 Image Upload

- Allows image preview upload in chats using `URL.createObjectURL()`.

### ✅ Form Validation

- Login and input forms validated with **Zod** and **React Hook Form**.

---

## 🧪 Getting Started Locally

1. **Clone the project**
   ```bash
   git clone https://github.com/shoeb-145/gemini-clone.git
   cd gemini-clone
   Install dependencies
   ```

bash
Copy
Edit
npm install
Start development server

bash
Copy
Edit
npm run dev
Open in browser: http://localhost:5173

## 📸 Screenshots

![alt text](./src/assets/image.png)
![alt text](./src/assets/Screenshot%202025-07-17%20160128.jpg)
![alt text](./src/assets/Screenshot%202025-07-17%20160447.jpg)
![alt text](./src/assets/Screenshot%202025-07-17%20160608.jpg)
