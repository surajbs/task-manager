# 🚀 TaskFlow

> A modern full-stack task management application built with **React 19**, **FastAPI**, **SQLAlchemy ORM**, and **PostgreSQL (Neon)**.

TaskFlow is a production-ready SaaS-inspired task management platform that enables users to securely manage their personal tasks with JWT authentication, a modern responsive UI, and a scalable full-stack architecture.

---

# 🚀 Project Status

✅ Production Ready

- Frontend deployed on **Vercel**
- Backend deployed on **Render**
- Database hosted on **Neon PostgreSQL**
- JWT Authentication
- Responsive SaaS UI
- REST API Architecture

---

# 🌐 Live Demo

| Application | URL |
|-------------|-----|
| **Frontend** | https://taskflow-roan-eight.vercel.app |
| **Backend API** | https://taskflow-4f9k.onrender.com |
| **Swagger API Docs** | https://taskflow-4f9k.onrender.com/docs |

---

# ✨ Features

### 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected Routes
- Session Persistence
- Logout

### ✅ Task Management

- Create Tasks
- Edit Tasks
- Delete Tasks
- Mark Tasks as Completed
- Mark Tasks as Active

### 📊 Dashboard

- Real-time Statistics
- Total Tasks
- Active Tasks
- Completed Tasks
- Search Results Counter

### 🔍 Productivity

- Search Tasks
- Filter Tasks
- Sort Tasks
- Responsive Task Cards

### 🎨 UI / UX

- Modern SaaS Design
- Responsive Layout
- Reusable Components
- Toast Notifications
- Loading States
- Empty States
- Form Validation
- Password Visibility Toggle

---

# 🏗 Project Architecture

```text
                   User
                     │
                     ▼
          React 19 + Vite (Vercel)
                     │
                Axios REST API
                     │
                     ▼
         FastAPI Backend (Render)
                     │
              SQLAlchemy ORM
                     │
                     ▼
      PostgreSQL Database (Neon)
```

---

# 🏗 Project Structure

```text
task-manager/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── styles/
│   │   └── App.jsx
│   │
│   ├── public/
│   ├── .env.development
│   ├── .env.production
│   └── package.json
│
├── backend/
│   ├── models/
│   ├── schemas/
│   ├── auth.py
│   ├── database.py
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
├── screenshots/
│
├── README.md
└── .gitignore
```

---

# 🛠 Tech Stack

## Frontend

- React 19
- Vite
- React Router
- Axios
- Context API
- Custom Hooks
- CSS3

---

## Backend

- FastAPI
- SQLAlchemy ORM
- PostgreSQL (Neon)
- JWT Authentication
- Pydantic

---

## Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | Neon PostgreSQL |
| Version Control | GitHub |

---

## Development Tools

- Git
- GitHub
- VS Code
- Render
- Vercel
- Neon

---

# 📸 Screenshots

## Login

![Login screen](task-manager/screenshots/Login.png)

---

## Signup

![Signup screen](task-manager/screenshots/Signup.png)

---

## Dashboard

![Dashboard overview](task-manager/screenshots/Dashboard.png)

---

## Task Management

![Task management view](task-manager/screenshots/Tasks.png)

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/surajbs/task-manager.git

cd task-manager
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on

```
http://localhost:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 🔑 Environment Variables

## Frontend (.env.development)

```env
VITE_API_BASE_URL=http://localhost:8000
```

---

## Frontend (.env.production)

```env
VITE_API_BASE_URL=https://taskflow-4f9k.onrender.com
```

---

## Backend (.env)

```env
DATABASE_URL=postgresql://your_neon_connection_string

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /signup |
| POST | /login |
| GET | /me |

---

## Tasks

| Method | Endpoint |
|---------|----------|
| GET | /tasks |
| POST | /tasks |
| PUT | /tasks/{id} |
| DELETE | /tasks/{id} |

---

# 🔒 Security

- Password Hashing (bcrypt)
- JWT Authentication
- Protected APIs
- User-specific Data Isolation
- Secure Route Protection
- Environment Variable Configuration

---

# 🗺 Roadmap

## Version 1.1

- Pagination
- User Profile
- Settings Page
- Alembic Database Migrations
- Docker Support

---

## Version 1.2

- Categories
- Labels
- Due Dates
- Email Notifications
- Team Collaboration

---

## Version 2.0

- Kanban Board
- Drag & Drop
- Analytics Dashboard
- Dark Mode
- Activity Timeline

---

# 📚 What I Learned

During this project I gained hands-on experience with:

- React Architecture
- Context API
- Custom Hooks
- FastAPI
- SQLAlchemy ORM
- PostgreSQL
- JWT Authentication
- REST API Design
- Responsive UI Design
- Authentication Flow
- CRUD Operations
- Frontend & Backend Integration
- Production Folder Structure
- Environment Variables
- Cloud Database Integration
- Git & GitHub Workflow
- Deploying Full Stack Applications
- Vercel Deployment
- Render Deployment
- Neon PostgreSQL

---

# 👨‍💻 Author

**Suraj BS**

**GitHub** - https://github.com/surajbs

⭐ If you found this project helpful, consider giving it a Star!

---
