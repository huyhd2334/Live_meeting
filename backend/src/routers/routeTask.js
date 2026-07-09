import express from "express"
import { createTaskControler, deleteTaskControler, getTasksController } from "../controller/taskController.js"

const taskRouter = express.Router()

taskRouter.post("/create", createTaskControler)
taskRouter.delete("/delete/:id", deleteTaskControler)
taskRouter.get("/get", getTasksController)
export default taskRouter