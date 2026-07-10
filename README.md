# 🚀 TeamWork Platform

> Nền tảng quản lý công việc & cộng tác nhóm theo thời gian thực — Workspace → Project → Task → Subtask, kèm chat, upload file, và gợi ý task bằng AI.

![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue?logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/Mongoose-MongoDB-47A248?logo=mongodb&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-realtime-black?logo=socket.io)

---

## 📖 Giới thiệu

**TeamWork Platform** là ứng dụng quản lý công việc nhóm dạng full-stack, cho phép người dùng tạo **workspace**, tổ chức **project**, chia nhỏ thành **task/subtask**, bình luận, đính kèm tệp và trò chuyện real-time với đồng đội. Dự án còn tích hợp một module **NLP** để tự động gợi ý task từ mô tả bằng ngôn ngữ tự nhiên.

## ✨ Tính năng chính

- 🔐 **Xác thực JWT** — đăng ký / đăng nhập, middleware bảo vệ route
- 🏢 **Workspace** — tạo workspace, thêm thành viên, quản lý dự án theo workspace
- 📁 **Project & Task** — CRUD project, task, subtask theo cấu trúc phân cấp
- 💬 **Bình luận task** — thảo luận trực tiếp trên từng công việc
- 📎 **Đính kèm tệp** — upload/lưu trữ file qua MinIO (object storage)
- 🗨️ **Chat real-time** — nhắn tin giữa các thành viên qua Socket.IO
- 🧠 **Gợi ý task bằng AI/NLP** — sinh task tự động từ mô tả (RAG/NLP service riêng)
- 📊 **Dashboard** — theo dõi tiến độ, biểu đồ (Chart.js / Recharts)

## 🧱 Kiến trúc & Công nghệ

**Backend** (`/backend`)
- Node.js + Express, kiến trúc phân lớp Controller → Service → Model
- Xác thực: JWT, `bcrypt`, `cookie-parser`
- Real-time: `socket.io`
- Cơ sở dữ liệu: **PostgreSQL** (`pg`) cho dữ liệu quan hệ (workspace/project/task...) và **MongoDB** (`mongoose`) cho một số model khác (chat, attachment...)
- Lưu trữ file: **MinIO**
- Gọi video/thoại: **Twilio**
- Cache/hàng đợi hỗ trợ: **Redis**
- Vector search cho NLP: **Qdrant**

**Frontend** (`/frontend`)
- React 18 + Vite, TailwindCSS 4, shadcn/ui (Radix)
- State/data: TanStack Query, Zustand
- Biểu đồ: Chart.js, Recharts
- Video call: `twilio-video`
- Real-time client: `socket.io-client`

**Hạ tầng phụ trợ** — khai báo sẵn trong `backend/docker-compose.yml`: Redis, MinIO, Qdrant.

### 📁 Cấu trúc thư mục (rút gọn)

```
TeamWork-Platform/
├── backend/
│   ├── config/              # Cấu hình DB (Postgres) & MinIO
│   ├── docker-compose.yml   # Redis, MinIO, Qdrant
│   └── src/
│       ├── controller/      # Xử lý HTTP request
│       ├── service/         # Business logic
│       ├── models/          # Schema dữ liệu
│       ├── routers/         # Định nghĩa API route
│       ├── middlewares/     # Auth middleware, multer (upload)
│       ├── lib/              # Axios instance dùng nội bộ (gọi NLP service)
│       └── server.js        # Entry point
│
└── frontend/
    └── src/
        ├── pages/            # Trang: Login/Signup, Home, Project, RAG
        ├── components/       # Component theo tính năng (Auth, HomePage, ProjectPage...)
        ├── context/          # React context
        ├── hooks/            # Custom hooks
        ├── service/          # Gọi API backend
        └── routes/           # Định nghĩa route phía client
```

## 🔌 API chính (backend)

| Nhóm | Base route | Mô tả |
|---|---|---|
| Auth | `/api/auth` | Đăng ký, đăng nhập |
| Workspace | `/api/workspace` | Tạo/xóa workspace, thêm thành viên, lấy project theo workspace |
| Project | `/api/project` | CRUD project |
| Task | `/api/task` | CRUD task |
| Subtask | `/api/subtask` | CRUD subtask |
| Comment | `/api/taskcomment` | Bình luận task |
| Attachment | `/api/attachment` | Upload/quản lý tệp đính kèm |
| NLP | `/api/nlp` | Gợi ý task từ mô tả tự nhiên |
| Chat | `/api/chat` | Nhắn tin |

Tất cả route (trừ `/api/auth`) đều đi qua middleware `protectedRouter` (xác thực JWT).

## ⚙️ Cài đặt & Chạy dự án

### Yêu cầu
- Node.js ≥ 18
- PostgreSQL đang chạy (database mặc định trong code: `techflow_db`)
- Docker (khuyến nghị, để chạy Redis/MinIO/Qdrant)
- (Tùy chọn) MongoDB nếu dùng các model Mongoose

### 1. Clone dự án
```bash
git clone https://github.com/huyhd2334/TeamWork-Platform.git
cd TeamWork-Platform
```

### 2. Chạy các dịch vụ phụ trợ (Redis, MinIO, Qdrant)
```bash
cd backend
docker compose up -d
```

### 3. Cấu hình biến môi trường
Tạo file `backend/.env`:
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
ACCESSKEYMINIO=admin
SECRETKEYMINIO=admin123456

# Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
```
> ⚠️ Hiện tại `backend/config/db.js` và `backend/config/minio.js` đang có một số giá trị (host/user/password) được hard-code trực tiếp trong code. Nên chuyển toàn bộ sang đọc từ `.env` (dùng `process.env.*`) trước khi deploy hoặc public repo, để tránh lộ thông tin nhạy cảm.

### 4. Cài đặt & chạy Backend
```bash
cd backend
npm install
npm run dev      # chạy bằng nodemon
```

### 5. Cài đặt & chạy Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend mặc định chạy tại `http://localhost:5173`, backend CORS đã được cấu hình để chấp nhận origin này.

## 🔐 Luồng xác thực

1. Người dùng đăng nhập → server tạo JWT
2. Client lưu token và gửi kèm khi kết nối Socket.IO / gọi API
3. `authMiddleware` xác thực token cho các route riêng tư
4. Nếu hợp lệ → cho phép truy cập API & sự kiện real-time

## 🗺️ Roadmap / việc cần bổ sung

- [ ] Viết test (hiện repo chưa có thư mục test)
- [ ] Thêm CI (GitHub Actions) để lint/test tự động
- [ ] Bổ sung file `.env.example` mẫu
- [ ] Tài liệu hóa API (Swagger/Postman collection)

## 🤝 Đóng góp

Pull request và issue đều được chào đón. Vui lòng tạo issue trước khi thực hiện thay đổi lớn.

## 📄 License

Chưa xác định (ISC theo `package.json`). Cân nhắc bổ sung file `LICENSE` rõ ràng.
