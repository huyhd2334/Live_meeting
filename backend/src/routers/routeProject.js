import express from "express"
import { createProjectControler, deleteProjectControler, findByProjectIdControler, findByProjectNameControler, getProjectAndTaskControler } from "../controller/projectController.js"

const projectRouter = express.Router()

projectRouter.get("/find/:id", findByProjectIdControler)
projectRouter.post("/create", createProjectControler)
projectRouter.delete("/delete/:id", deleteProjectControler)
projectRouter.get("/task/:id", getProjectAndTaskControler)
// projectRouter.get("/find-name/:name", findByProjectNameControler)

export default projectRouter