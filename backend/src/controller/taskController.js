import { createTaskService, deleteTaskService } from "../service/taskService.js"

export const createTaskControler = async(req, res) => {
    try {
        const result = await createTaskService(req)
        console.log("Created success", result.task)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteTaskControler = async(req, res) => {
    try {
        const result = await deleteTaskService(req)
        console.log("Deleted success", result.task)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}