import express from "express"
import { nlpSuggestTaskController } from "../controller/nlpController.js"

const routerNLP = express.Router()
routerNLP.post("/suggest-task", nlpSuggestTaskController)

export default routerNLP

