import { createTaskCommentService, deleteTaskCommentService } from "../service/taskCommentService.js"

export const createTaskCommentControler = async(req, res) => {
    try {
        const result = await createTaskCommentService(req)
        console.log("Created success", result.task)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteTaskCommentControler = async(req, res) => {
    try {
        const result = await deleteTaskCommentService(req)
        console.log("Deleted success", result.task)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}