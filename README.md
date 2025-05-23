
# 🚀 EduConnect

**AI-Powered Student-Teacher Collaboration Platform**  
Bridging the gap between students and teachers through smart mentorship tools, AI chat assistance, and data-driven decision-making.

---

## 🧠 Overview

EduConnect is a modern web-based platform designed to simplify and enhance the process of student-teacher mentorship. It integrates an AI chatbot (Gemini API), role-based login, and smart dashboards to improve mentor allocation and academic collaboration.

---

## 🌟 Features

- 🎓 Role-based signup/login (Student/Teacher)
- 📊 CGPA & skill-based filtering for smart mentor selection
- 🤖 AI-powered chatbot for real-time assistance
- 📈 Mentorship trend graphs with React-based visualizations
- 🔒 Secure JWT authentication & role-based access control
- 💾 Persistent MongoDB database for secure storage
- 🧑‍💻 Dashboards for both students and teachers
- 🧭 Peer profile browsing based on domain/skills

---

## 🛠️ Tech Stack

| Tech | Role |
|------|------|
| React.js | Frontend |
| Node.js + Express | Backend |
| MongoDB | Database |
| Gemini API | AI Chatbot |
| JWT | Authentication |
| Bcrypt | Data encryption |

---

## 📸 Screenshots

### Home Page
![Image](https://github.com/user-attachments/assets/9f86644f-1534-40f6-877b-1705cf201582)

![Image](https://github.com/user-attachments/assets/01216802-0c22-450b-8dda-685019388cb6)

![Image](https://github.com/user-attachments/assets/e1f53cce-b20e-478a-ad76-0962ec3cbae5)

### 🔐 Authentication
| Login | Signup |
|-------|--------|
| ![Image](https://github.com/user-attachments/assets/6d173dca-c8c8-4c0b-84de-b56f1cfe7c1d) | ![Image](https://github.com/user-attachments/assets/08d5332f-9355-4e89-a651-e695432856af)|

### 🧑‍🎓 Student Profile
![Image](https://github.com/user-attachments/assets/a5e7af46-4a8d-4268-848a-d8c1f86bedfa)

### 🧑‍🎓 Student Dashboard
![Image](https://github.com/user-attachments/assets/324e2854-44a2-4589-ace9-fc44c53abb74)

### 👩‍🏫 Teacher Profile 
![Image](https://github.com/user-attachments/assets/24a8db7c-704b-4a34-a6af-a1a5cd9622e6)

### 👩‍🏫 Teacher Dashboard
![Image](https://github.com/user-attachments/assets/b118cc90-be32-4ed6-94ef-9cb167be0daa)

### 🤖 AI Chatbot
![Image](https://github.com/user-attachments/assets/a4abaf85-31b8-446e-9fa8-bf9fa437b251)

### 📈 Mentorship Trend Visualization
![Image](https://github.com/user-attachments/assets/f5e725fb-299e-4845-a76f-7924886e2b9d)

---

## ⚙️ How to Run Locally

```bash
# Clone the repo
git clone https://github.com/your-username/educonnect.git

# Navigate to frontend
cd Frontend
npm install
npm run dev

# Navigate to backend
cd Backend
npm install
npx nodemon server.js
