import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import path from 'path';
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
import { Server } from "socket.io"
import http from "http"

const app = express()
const server = http.createServer(app)

dotenv.config();

const __dirname = path.resolve();

// middleware
app.use(express.json())

// cookie
app.use(cookieParser())

const io = new Server(server, {
  cors: {
    // origin: "https://ctpt0djm-5173.asse.devtunnels.ms",
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }
})

app.use(cors({
  origin: "http://localhost:5173",
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Start server
server.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});