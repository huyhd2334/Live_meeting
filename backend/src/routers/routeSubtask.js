import express from "express"
import { createSubTaskControler, deleteSubTaskControler, getSubTaskControler } from "../controller/subtaskController.js"

const subTaskRouter = express.Router()

subTaskRouter.post("/create", createSubTaskControler)
subTaskRouter.delete("/delete/:id", deleteSubTaskControler)
subTaskRouter.get("/get/:workspace_id/:task_id", getSubTaskControler)

export default subTaskRouter