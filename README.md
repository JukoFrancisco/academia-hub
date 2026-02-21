# 🎓 Academia Hub

**Academia Hub** is a next-generation student management platform and analytics dashboard built for modern universities. 

This project was developed as a requirement for **Application Development and Emerging Technologies**. It features a robust backend architecture, a real-time reactive frontend, and a premium "iOS 26" glassmorphic design system.

---

## ✨ Key Features
- **Live Registry (CRUD):** Add, view, edit, and delete student profiles instantly without page reloads.
- **Dynamic Analytics Dashboard:** Real-time data visualization including Enrollment by College (Bar Chart), Academic Standing (Donut Chart), and GWA Distribution (Area Chart).
- **Automated GWA Logic:** Automatically flags at-risk students based on their General Weighted Average.
- **Advanced Sorting & Filtering:** Instantly search by Name/ID or sort records by GWA and alphabetical order.
- **Data Export:** Built-in "Download CSV" functionality for seamless report generation.

## 🛠 Tech Stack
- **Frontend:** React.js (Vite), CSS3 (Glassmorphism UI), Recharts (Data Visualization), React-Hot-Toast
- **Backend:** Node.js, Express.js
- **Database:** MongoDB & Mongoose ORM

---

## 🚀 Installation & Setup Guide

To run this project locally on your machine, follow these steps:

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local instance or MongoDB Atlas)

### 2. Clone the Repository
\`\`\`bash
git clone https://github.com/YOUR_USERNAME/academia-hub.git
cd academia-hub
\`\`\`

### 3. Backend Setup
Open a terminal and navigate to the backend directory:
\`\`\`bash
cd backend
npm install
\`\`\`

Create a `.env` file in the `backend` folder and add your MongoDB connection string and Port:
\`\`\`env
PORT=5001
MONGO_URI=your_mongodb_connection_string_here
\`\`\`

Start the backend server:
\`\`\`bash
npm run dev
\`\`\`
*(The server should now be running on http://localhost:5001)*

### 4. Frontend Setup
Open a **second** terminal and navigate to the frontend directory:
\`\`\`bash
cd frontend-react
npm install
\`\`\`

Start the React development server:
\`\`\`bash
npm run dev
\`\`\`
*(The frontend should now be running on http://localhost:5173)*

---

## 👨‍💻 Author
**Juko** *Application Development and Emerging Technologies*
