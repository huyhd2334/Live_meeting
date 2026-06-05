import { nlpSuggestTaskService } from "../service/nlpService.js"

export const nlpSuggestTaskController = async (req, res, next) => {
    try {
        const data = await nlpSuggestTaskService(req)
        return res.json(data)
    } catch (err) {
        next(err)
    }
}