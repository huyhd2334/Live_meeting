import express from "express"
import { addWorkSpaceMemberControler, createWorkSpaceControler, deleteWorkSpaceControler, getFullControler, getUserWorkSpaceControler, getWorkSpaceProjectControler } from "../controller/workSpaceController.js"

const workSpace = express.Router()

workSpace.post("/create", createWorkSpaceControler)
workSpace.post("/addmember", addWorkSpaceMemberControler)
workSpace.get("/get", getUserWorkSpaceControler)
workSpace.get("/get/projects/:id", getWorkSpaceProjectControler)
workSpace.delete("/delete/:id", deleteWorkSpaceControler)
workSpace.get("/get/full/:id", getFullControler)

export default workSpace