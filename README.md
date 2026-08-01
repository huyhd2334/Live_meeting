# 🚀 TeamWork Platform

> A workspace team collaboration and project management platform — Workspace → Project → Task → Subtask, with chat RAG, file attachments, and AI-powered task suggestions.

![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue?logo=postgresql&logoColor=white)
---

## 📖 Overview

**TeamWork Platform** is a full-stack team productivity app. Users can create **workspaces**, organize **projects**, break work down into **tasks/subtasks**, comment, attach files, and chat with teammates in real time. The project also integrates an **NLP** module that can automatically suggest tasks from a natural-language description.

## ✨ Key Features

- 🔐 **JWT Authentication** — sign up / log in, protected-route middleware
- 🏢 **Workspaces** — create workspaces, add members, manage projects per workspace
- 📁 **Projects & Tasks** — full CRUD for projects, tasks, and subtasks in a hierarchical structure
- 💬 **Task comments** — discuss directly on each task
- 📎 **File attachments** — upload/store files via MinIO (object storage)
- 🧠 **AI/NLP task suggestions** — auto-generate tasks from a natural-language description (RAG/NLP service)
- 📊 **Dashboard** — track progress with charts (Chart.js / Recharts)

## 🧱 Architecture & Tech Stack

**Backend** (`/backend`)
- Node.js + Express, Controller → Service → Model layered architecture
- Auth: JWT, `bcrypt`, `cookie-parser`
- Real-time: `socket.io`
- Database: **PostgreSQL** (`pg`) for relational data (workspaces/projects/tasks...)
- File storage: **MinIO**

**Frontend** (`/frontend`)
- React 18 + Vite, TailwindCSS 4, shadcn/ui (Radix)
- State/data: TanStack Query, Zustand
- Charts: Chart.js, Recharts

**Supporting infrastructure** — pre-defined in `backend/docker-compose.yml`: MinIO.

### 📁 Project Structure (simplified)

```
TeamWork-Platform/
├── backend/
│   ├── config/              # Postgres & MinIO configuration
│   ├── docker-compose.yml   # MinIO
│   └── src/
│       ├── controller/      # HTTP request handlers
│       ├── service/         # Business logic
│       ├── models/          # Data schemas
│       ├── routers/         # API route definitions
│       ├── middlewares/     # Auth middleware, multer (uploads)
│       ├── lib/              # Internal axios instance (calls the NLP service)
│       └── server.js        # Entry point
│
└── frontend/
    └── src/
        ├── pages/            # Pages: Login/Signup, Home, Project, RAG
        ├── components/       # Feature-based components (Auth, HomePage, ProjectPage...)
        ├── context/          # React context
        ├── hooks/            # Custom hooks
        ├── service/          # Backend API calls
        └── routes/           # Client-side route definitions
```

## 🔌 Main API Routes (backend)

| Group | Base route | Description |
|---|---|---|
| Auth | `/api/auth` | Register, log in |
| Workspace | `/api/workspace` | Create/delete workspace, add members, get projects by workspace |
| Project | `/api/project` | Project CRUD |
| Task | `/api/task` | Task CRUD |
| Subtask | `/api/subtask` | Subtask CRUD |
| Comment | `/api/taskcomment` | Task comments CRUD|
| Attachment | `/api/attachment` | Upload/manage file attachments CRUD|
| NLP | `/api/nlp` | Suggest tasks from natural-language input |
All routes except `/api/auth` go through the `protectedRouter` middleware (JWT authentication).

## ⚙️ Setup & Running the Project

### Requirements
- Node.js ≥ 18
- A running PostgreSQL instance (default database name in code: `techflow_db`)
- Docker (recommended, to run MinIO)
- (Optional) MongoDB, if the Mongoose models are actively used

### 1. Clone the repository
```bash
git clone https://github.com/huyhd2334/TeamWork-Platform.git
cd TeamWork-Platform
```

### 2. Start supporting services ( MinIO )
```bash
cd backend
docker compose up -d
```

### 3. Configure environment variables
Create a `backend/.env` file:
```env
PORT=5000
NODE_ENV=development

# PostgreSQL
PG_HOST=localhost
PG_USER=postgres
PG_PASSWORD=your_password
PG_DATABASE=techflow_db
PG_PORT=5432

# JWT
JWT_SECRET=your_jwt_secret

# MinIO
ACCESSKEYMINIO=ACCESS_KEYMINIO
SECRETKEYMINIO=SECRET_KEYMINIO

# Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
```

### 4. Install & run the Backend
```bash
cd backend
npm install
npm run dev      # runs via nodemon
```

### 5. Install & run the Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend runs by default at `http://localhost:5173`; the backend's CORS config already allows this origin.

## 🔐 Authentication Flow

1. User logs in → server issues a JWT
2. Client stores the token and sends it with Socket.IO connections / API calls
3. `authMiddleware` verifies the token on private routes
4. If valid → access is granted to protected APIs

## 🗺️ Roadmap / To Do

- [ ] Add automated tests (no test folder currently)
- [ ] Add CI (GitHub Actions) for linting/testing
- [ ] Add a `.env.example` file
- [ ] API documentation (Swagger/Postman collection)

## 🤝 Contributing

Pull requests and issues are welcome. Please open an issue before making major changes.
## Link Demo On Render
https://teamwork-platform.onrender.com
## 📄 License
