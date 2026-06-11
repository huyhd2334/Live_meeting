import express from "express"
import { addProjectAttachmentsController } from "../controller/attachmentsController.js"
import { upload } from "../middlewares/multer.js"

const attachmentRouter = express.Router()

attachmentRouter.post("/upload", upload.single("file"), addProjectAttachmentsController)

export default attachmentRouter