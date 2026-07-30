import "dotenv/config";
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from 'path';
import { fileURLToPath } from "url";
import routerAuth from "./routers/routeAuth.js"
import twilio from "twilio"; 
import { protectedRouter } from "./middlewares/authMiddleware.js"
import workSpaceRouter from "./routers/routeWorkSpace.js"
import projectRouter from "./routers/routeProject.js"
import taskRouter from "./routers/routeTask.js"
import subTaskRouter from "./routers/routeSubtask.js";
import taskCommentRouter from "./routers/routeComment.js"
import attachmentRouter from "./routers/routeAttachments.js"
import routerNLP from "./routers/routeNLP.js";
import chatRouter from "./routers/routChat.js"
import { Server } from "socket.io"
import http from "http"

const app = express()
const server = http.createServer(app)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDist = path.resolve(__dirname, "../../frontend/dist");

// middleware
app.use(express.json())

// cookie
app.use(cookieParser())

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// socket io
io.on("connection", (socket) => {

  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });

});

// public router 
app.use("/api/auth", routerAuth)

// private routers
app.use("/api/workspace", protectedRouter, workSpaceRouter)
app.use("/api/project", protectedRouter, projectRouter)
app.use("/api/task", protectedRouter, taskRouter)
app.use("/api/subtask", protectedRouter, subTaskRouter)
app.use("/api/taskcomment", protectedRouter, taskCommentRouter)
app.use("/api/attachment", protectedRouter, attachmentRouter)
app.use("/api/nlp/", protectedRouter, routerNLP)
app.use("/api/chat/", protectedRouter, chatRouter)


if (process.env.NODE_ENV === "production") {
  app.use(express.static(frontendDist));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

// Start server
server.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
