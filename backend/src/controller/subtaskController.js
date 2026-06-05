import { createSubTaskService, deleteSubTaskService, getSubTaskService } from "../service/subtaskService.js"

export const createSubTaskControler = async(req, res) => {
    try {
        const result = await createSubTaskService(req)
        console.log("Created success", result.subTask)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteSubTaskControler = async(req, res) => {
    try {
        const result = await deleteSubTaskService(req)
        console.log("Deleted success", result.task)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getSubTaskControler = async(req, res) => {
    try {
        const result = await getSubTaskService(req)
        console.log("Got success", result.subTask)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}