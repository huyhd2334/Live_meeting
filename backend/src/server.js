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
import taskCommentRouter from "./routers/routeTaskComment.js"
const app = express()
dotenv.config();

const __dirname = path.resolve();

// middleware
app.use(express.json())

// cookie
app.use(cookieParser())

cors
app.use(cors({
  origin: "https://ctpt0djm-5173.asse.devtunnels.ms",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// public router 
app.use("/api/auth", routerAuth)
// public router 

// private routers
app.use("/api/workspace", protectedRouter, workSpaceRouter)
app.use("/api/project", protectedRouter, projectRouter)
app.use("/api/task", protectedRouter, taskRouter)
app.use("/api/subtask", protectedRouter, subTaskRouter)
app.use("/api/taskcomment", protectedRouter, taskCommentRouter)
// private routers

// twilio setup begin
// twilio setup end

if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});



// const AccessToken = twilio.jwt.AccessToken;
// const VideoGrant = AccessToken.VideoGrant;

// app.get("/api/tokentwilio", (req, res) => {
//   const identity = req.query.identity || "user" + Math.floor(Math.random() * 1000);
//   const room = req.query.room || "defaultRoom";

//   const token = new AccessToken(
//     process.env.TWILIO_ACCOUNT_SID,
//     process.env.TWILIO_API_KEY,
//     process.env.TWILIO_API_SECRET,
//     { identity }
//   );
//   token.addGrant(new VideoGrant({ room }));
//   res.json({ token: token.toJwt(), identity });
// });

